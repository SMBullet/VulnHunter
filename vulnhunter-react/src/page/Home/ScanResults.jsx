import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assuming you have Shadcn UI Button and Input components
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'; // Import Radix Icon
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import Shadcn UI Select components

// Updated sample data
const data = [
  { id: 1, scanName: 'VulnScan A', ipAddress: '192.168.1.1', date: '2024-01-15', pdfFile: 'report1.pdf', toolUsed: 'Nmap' },
  { id: 2, scanName: 'VulnScan B', ipAddress: '192.168.1.2', date: '2024-02-20', pdfFile: 'report2.pdf', toolUsed: 'Nikto' },
  { id: 3, scanName: 'VulnScan C', ipAddress: '192.168.1.3', date: '2024-03-25', pdfFile: 'report3.pdf', toolUsed: 'Nessus' },
  { id: 4, scanName: 'VulnScan D', ipAddress: '192.168.1.4', date: '2024-04-30', pdfFile: 'report4.pdf', toolUsed: 'dnsenum' },
  { id: 5, scanName: 'VulnScan E', ipAddress: '192.168.1.5', date: '2024-05-10', pdfFile: 'report5.pdf', toolUsed: 'Dirb' },
  { id: 6, scanName: 'VulnScan F', ipAddress: '192.168.1.6', date: '2024-06-15', pdfFile: 'report6.pdf', toolUsed: 'Nmap' },
  { id: 7, scanName: 'VulnScan G', ipAddress: '192.168.1.7', date: '2024-07-20', pdfFile: 'report7.pdf', toolUsed: 'Nikto' },
  { id: 8, scanName: 'VulnScan H', ipAddress: '192.168.1.8', date: '2024-08-25', pdfFile: 'report8.pdf', toolUsed: 'Nessus' },
];

const PAGE_SIZE = 5;

function ScanResults() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('alphabetical'); // Default sorting

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  // Filter data based on search query
  const filteredData = data.filter(row => 
    row.scanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.ipAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort data based on selected sort option
  const sortedData = filteredData.sort((a, b) => {
    if (sortOption === 'alphabetical') {
      return a.scanName.localeCompare(b.scanName);
    } else if (sortOption === 'date-oldest') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOption === 'date-newest') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  // Get current page data
  const currentRows = sortedData.slice(startIndex, startIndex + PAGE_SIZE);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white mb-2">Scan Results</h1>
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <Select value={sortOption} onValueChange={setSortOption} className="text-xs py-1 px-2 w-32">
              <SelectTrigger>
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
                <SelectItem value="date-oldest">Date: Oldest to Newest</SelectItem>
                <SelectItem value="date-newest">Date: Newest to Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative flex items-center flex-grow">
            <Input 
              placeholder="Search by scan name or IP address..." 
              className="text-xs py-2 px-4 pr-10 w-full placeholder-gray-500 text-gray-300" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="overflow-hidden rounded-lg border border-gray-700">
          <table className="min-w-full bg-transparent">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-white font-bold uppercase tracking-wider border-b border-gray-700">Scan Name</th>
                <th className="px-4 py-2 text-left text-white font-bold uppercase tracking-wider border-b border-gray-700">IP Address</th>
                <th className="px-4 py-2 text-left text-white font-bold uppercase tracking-wider border-b border-gray-700">Date</th>
                <th className="px-4 py-2 text-left text-white font-bold uppercase tracking-wider border-b border-gray-700">PDF File</th>
                <th className="px-4 py-2 text-left text-white font-bold uppercase tracking-wider border-b border-gray-700">Tool Used</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr key={row.id} className="transition-colors duration-300 hover:bg-gray-700">
                  <td className="px-4 py-2 text-sm whitespace-nowrap text-gray-300 border-b border-gray-700">{row.scanName}</td>
                  <td className="px-4 py-2 text-sm whitespace-nowrap text-gray-300 border-b border-gray-700">{row.ipAddress}</td>
                  <td className="px-4 py-2 text-sm whitespace-nowrap text-gray-300 border-b border-gray-700">{row.date}</td>
                  <td className="px-4 py-2 text-sm whitespace-nowrap text-gray-300 border-b border-gray-700">
                    <a href={`/${row.pdfFile}`} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                      {row.pdfFile}
                    </a>
                  </td>
                  <td className="px-4 py-2 text-sm whitespace-nowrap text-gray-300 border-b border-gray-700">{row.toolUsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between mt-4 items-center">
        <div className="text-white text-xs">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <Button onClick={handlePrevious} disabled={currentPage === 1} className="text-xs">Previous</Button>
          <Button onClick={handleNext} disabled={currentPage === totalPages} className="text-xs">Next</Button>
        </div>
      </div>
    </div>
  );
}

export default ScanResults;
