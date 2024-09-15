import React from 'react';

const ScanResults = ({ onBackToScannerClick }) => {
  // Example data; replace with real scan result data
  const scanResult = {
    tool: 'Nmap',
    target: '192.168.1.1',
    status: 'Completed',
    timestamp: '2024-09-14T12:00:00Z',
    findings: [
      { id: 1, service: 'HTTP', port: 80, status: 'Open' },
      { id: 2, service: 'SSH', port: 22, status: 'Closed' },
      { id: 3, service: 'FTP', port: 21, status: 'Open' }
    ]
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-800 text-white">
      <div className="w-full max-w-4xl bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold mb-4">Scan Results</h1>
        <p className="text-lg mb-6">
          Here are the results for your recent scan.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Summary</h2>
          <ul className="list-disc list-inside bg-gray-800 p-4 rounded-md border border-gray-700">
            <li><strong>Tool:</strong> {scanResult.tool}</li>
            <li><strong>Target:</strong> {scanResult.target}</li>
            <li><strong>Status:</strong> {scanResult.status}</li>
            <li><strong>Timestamp:</strong> {new Date(scanResult.timestamp).toLocaleString()}</li>
          </ul>
        </div>

        <div className="flex justify-between">
          <button 
            onClick={onBackToScannerClick}
            className="bg-purple-600 text-white py-2 px-4 rounded-md shadow hover:bg-purple-700 transition duration-200"
          >
            Back to Scanner
          </button>
          <button className="bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700 transition duration-200">
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanResults;
