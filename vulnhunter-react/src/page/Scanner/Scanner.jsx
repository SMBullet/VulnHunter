import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import Shadcn UI Select components
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'; // Import Radix Icon
import Slider from 'react-slick'; // Import react-slick for carousel
import 'slick-carousel/slick/slick.css'; // Import slick-carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme styles

const toolDefinitions = [
  {
    name: 'Nmap',
    description: 'Network mapper for discovering hosts and services on a network.',
  },
  {
    name: 'Nikto',
    description: 'Web server scanner for finding vulnerabilities and misconfigurations.',
  },
  {
    name: 'Nessus',
    description: 'Comprehensive vulnerability scanner for identifying potential security issues.',
  },
  {
    name: 'Dirb',
    description: 'Web content scanner for discovering hidden directories and files on a web server.',
  },
  {
    name: 'Dnsenum',
    description: 'DNS enumeration tool for gathering information about DNS records and domain names.',
  },
  {
    name: 'OpenVAS',
    description: 'Open-source vulnerability scanner and management system for network security.',
  },
  {
    name: 'Burp Suite',
    description: 'Integrated platform for performing security testing of web applications.',
  },
];

const Scanner = () => {
  const [ipOrDomain, setIpOrDomain] = useState('');
  const [selectedTool, setSelectedTool] = useState('nmap');
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);

    try {
      const response = await fetch('http://localhost:8080/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ipOrDomain, tool: selectedTool }),
      });

      const data = await response.json();

      if (response.ok) {
        setScanResult(data.result);
        // Scroll to results
        document.getElementById('scan-results')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('An error occurred while initiating the scan.');
    } finally {
      setIsScanning(false);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6 bg-gray-800">
      {/* Scanner Form */}
      <div className="w-full md:w-1/2 max-w-lg bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold mb-4 text-white">Network Scanner</h1>
        <p className="text-lg text-gray-300 mb-6">
          Enter an IP address or domain name and choose a scanning tool to start the security assessment.
          Make sure to select the appropriate tool based on your scanning requirements.
        </p>

        <div className="relative mb-6">
          <Input 
            placeholder="Enter IP address or domain..." 
            className="text-sm py-3 px-4 pr-10 bg-gray-700 text-gray-100 rounded-md border border-gray-600 focus:ring-2 focus:ring-purple-500" 
            value={ipOrDomain} 
            onChange={(e) => setIpOrDomain(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <div className="mb-6">
          <Select value={selectedTool} onValueChange={setSelectedTool} className="text-sm py-2 px-3 bg-gray-700 text-gray-100 rounded-md border border-gray-600 focus:ring-2 focus:ring-purple-500">
            <SelectTrigger>
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
          className="bg-purple-600 text-white py-2 px-4 rounded-md shadow hover:bg-purple-700 transition duration-200"
          disabled={isScanning}
        >
          {isScanning ? 'Scanning...' : 'Launch Scan'}
        </Button>
      </div>

      {/* Explanatory Text */}
      <div className="w-full md:w-1/2 max-w-lg p-6 md:pl-12 mt-8 md:mt-0">
        <h2 className="text-2xl font-semibold text-white mb-4">Why Use a Scanner?</h2>
        <p className="text-gray-300 mb-6">
          Network scanners are essential tools in cybersecurity for identifying vulnerabilities and security weaknesses in networked systems.
          By choosing the right tool and entering the correct target, you can gain valuable insights into potential security issues.
        </p>

        <div className="carousel-container">
          <Slider {...settings}>
            {toolDefinitions.map((tool) => (
              <div key={tool.name} className="bg-gray-700 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
                <p className="text-gray-400">{tool.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Scan Results */}
      {scanResult && (
        <div id="scan-results" className="w-full max-w-lg mt-8 bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4">Scan Results</h2>
          <pre className="text-gray-300 whitespace-pre-wrap">{scanResult}</pre>
        </div>
      )}
    </div>
  );
};

export default Scanner;
