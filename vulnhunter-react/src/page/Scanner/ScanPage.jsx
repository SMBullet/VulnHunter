import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RocketIcon } from '@radix-ui/react-icons';
import { PDFDocument, rgb } from 'pdf-lib'; // Import pdf-lib

const toolDefinitions = [
  { name: 'Nmap', description: 'Network mapper for discovering hosts and services on a network.' },
  { name: 'Nikto', description: 'Web server scanner for finding vulnerabilities and misconfigurations.' },
  { name: 'Nessus', description: 'Comprehensive vulnerability scanner for identifying potential security issues.' },
  { name: 'Dirb', description: 'Web content scanner for discovering hidden directories and files on a web server.' },
  { name: 'Dnsenum', description: 'DNS enumeration tool for gathering information about DNS records and domain names.' },
  { name: 'OpenVAS', description: 'Open-source vulnerability scanner and management system for network security.' },
  { name: 'Burp Suite', description: 'Integrated platform for performing security testing of web applications.' }
];

// Regular expression for validating an IP address
const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// Regular expression for validating a domain name
const domainRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?:[A-Za-z0-9-]{2,}|[A-Za-z0-9-]{2,}\.[A-Za-z]{2,})$/;

const ScanPage = () => {
  const [ipOrDomain, setIpOrDomain] = useState('');
  const [selectedTool, setSelectedTool] = useState('nmap');
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [tabValue, setTabValue] = useState('tools');
  const [error, setError] = useState('');
  const [pdfBlobUrl, setPdfBlobUrl] = useState(''); // State for the PDF Blob URL
  const [pdfFileName, setPdfFileName] = useState(''); // State for the PDF file name
  const scanResultsRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    const savedResult = localStorage.getItem('scanResult');
    if (savedResult) setScanResult(JSON.parse(savedResult));

    const savedIpOrDomain = localStorage.getItem('ipOrDomain');
    if (savedIpOrDomain) setIpOrDomain(savedIpOrDomain);
  }, []);

  useEffect(() => {
    if (scanResult) localStorage.setItem('scanResult', JSON.stringify(scanResult));
    else localStorage.removeItem('scanResult');
  }, [scanResult]);

  useEffect(() => {
    localStorage.setItem('ipOrDomain', ipOrDomain);
  }, [ipOrDomain]);

  useEffect(() => {
    if (scanResult && tabsRef.current) {
      setTabValue('results');
    }
  }, [scanResult]);

  const handleScan = async () => {
    if (!ipOrDomain) {
      setError('IP address or domain is required.');
      return;
    }
    if (!ipRegex.test(ipOrDomain) && !domainRegex.test(ipOrDomain)) {
      setError('Please enter a valid IP address or domain.');
      return;
    }

    setError('');
    setIsScanning(true);
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        setError("You must be authenticated to perform a scan.");
        return;
      }

      const response = await fetch('http://localhost:5455/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ipOrDomain, tool: selectedTool }),
      });

      const data = await response.json();

      if (response.ok) {
        setScanResult({
          tool: data.tool,
          target: data.target,
          status: data.status,
          timestamp: data.timestamp,
          result: data.result
        });
        scrollToResults();
        generatePDF(data); // Generate the PDF here
      } else {
        setError(`Error: ${data.error || 'Unknown error occurred'}`);
      }
    } catch (error) {
      setError('An error occurred while initiating the scan.');
    } finally {
      setIsScanning(false);
    }
  };

  const scrollToResults = () => {
    if (scanResultsRef.current) {
      scanResultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const generatePDF = async (data) => {
    const { tool, target, status, timestamp, result } = data;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 1000]);
    const { width, height } = page.getSize();
    const fontSize = 12;

    page.drawText(`Scan Report`, { x: 50, y: height - 50, size: fontSize, color: rgb(0, 0, 0) });
    page.drawText(`Tool: ${tool}`, { x: 50, y: height - 80, size: fontSize, color: rgb(0, 0, 0) });
    page.drawText(`Target: ${target}`, { x: 50, y: height - 100, size: fontSize, color: rgb(0, 0, 0) });
    page.drawText(`Status: ${status}`, { x: 50, y: height - 120, size: fontSize, color: rgb(0, 0, 0) });
    page.drawText(`Timestamp: ${new Date(timestamp).toLocaleString()}`, { x: 50, y: height - 140, size: fontSize, color: rgb(0, 0, 0) });
    page.drawText(`Result:`, { x: 50, y: height - 180, size: fontSize, color: rgb(0, 0, 0) });
    page.drawText(result, { x: 50, y: height - 200, size: fontSize, color: rgb(0, 0, 0), maxWidth: width - 100 });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const firstName = 'John'; // Replace with actual first name
    const lastName = 'Doe'; // Replace with actual last name
    const formattedDate = new Date(timestamp).toISOString().replace(/:/g, '-');
    const fileName = `${ipOrDomain}-${tool}-${firstName.charAt(0)}${lastName.charAt(0)}-${formattedDate}.pdf`;

    setPdfBlobUrl(url);
    setPdfFileName(fileName);
  };

  const handleDownload = () => {
    if (pdfBlobUrl) {
      const link = document.createElement('a');
      link.href = pdfBlobUrl;
      link.download = pdfFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Network Scanner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative flex flex-col">
                <Input 
                  placeholder="Enter IP address or domain..." 
                  className="w-full bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-purple-500" 
                  value={ipOrDomain} 
                  onChange={(e) => setIpOrDomain(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <Select value={selectedTool} onValueChange={setSelectedTool} className="flex-1">
                <SelectTrigger className="w-full bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-purple-500">
                  <SelectValue placeholder="Select Tool" />
                </SelectTrigger>
                <SelectContent>
                  {toolDefinitions.map((tool) => (
                    <SelectItem key={tool.name} value={tool.name.toLowerCase()}>
                      {tool.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleScan} 
              className="w-full bg-purple-600 hover:bg-purple-700 transition duration-200"
              disabled={isScanning}
            >
              {isScanning ? 'Scanning...' : 'Launch Scan'}
              <RocketIcon className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="tools" value={tabValue} onValueChange={setTabValue} ref={tabsRef} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tools">Scanning Tools</TabsTrigger>
            <TabsTrigger value="results">Scan Results</TabsTrigger>
          </TabsList>
          <TabsContent value="tools">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {toolDefinitions.map((tool) => (
                    <div 
                      key={tool.name} 
                      className="bg-gray-700 p-4 rounded-lg shadow-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                      <p className="text-sm text-gray-300">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="results">
            {scanResult ? (
              <Card className="bg-gray-800 border-gray-700" ref={scanResultsRef}>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Scan Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Summary</h3>
                      <ul className="list-disc list-inside bg-gray-700 p-3 rounded-md text-sm">
                        <li><strong>Tool:</strong> {scanResult.tool}</li>
                        <li><strong>Target:</strong> {scanResult.target}</li>
                        <li><strong>Status:</strong> {scanResult.status}</li>
                        <li><strong>Timestamp:</strong> {new Date(scanResult.timestamp).toLocaleString()}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Full Results</h3>
                      <pre className="bg-gray-700 p-6 rounded-md text-base whitespace-pre-wrap overflow-auto max-h-96">
                        {scanResult.result}
                      </pre>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      onClick={() => setScanResult(null)}
                      variant="secondary"
                      className="bg-gray-700 hover:bg-gray-600"
                    >
                      New Scan
                    </Button>
                    <Button 
                      onClick={handleDownload}
                      className={`bg-green-600 hover:bg-green-700 ${!pdfBlobUrl && 'cursor-not-allowed opacity-50'}`}
                      disabled={!pdfBlobUrl}
                    >
                      Download Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <p className="text-center text-gray-400">No scan results available. Run a scan to see results here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ScanPage;
