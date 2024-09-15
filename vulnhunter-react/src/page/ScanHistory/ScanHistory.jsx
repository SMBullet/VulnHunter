import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FaFilePdf } from 'react-icons/fa'; // Importing FontAwesome PDF icon

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

function ScanHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('alphabetical');

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const filteredData = data.filter(row => 
    row.scanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.ipAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="container mx-auto p-6 bg-gray-900 text-gray-100 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative flex-grow mr-4 w-80">
          <Input 
            placeholder="Search by scan name or IP address..." 
            className="text-sm py-2 px-4 pr-10 bg-gray-800 text-gray-300 rounded-md border border-gray-700" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <div className="w-36">
          <Select value={sortOption} onValueChange={setSortOption} className="text-sm py-2 px-3 bg-gray-800 text-gray-300 rounded-md border border-gray-700">
            <SelectTrigger>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alphabetical">A-Z</SelectItem>
              <SelectItem value="date-oldest">Oldest</SelectItem>
              <SelectItem value="date-newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
        <table className="min-w-full bg-gray-800 text-gray-100">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-purple-400">Scan Name</th>
              <th className="px-6 py-3 text-left text-purple-400">IP Address</th>
              <th className="px-6 py-3 text-left text-purple-400">Date</th>
              <th className="px-6 py-3 text-left text-purple-400">PDF File</th>
              <th className="px-6 py-3 text-left text-purple-400">Tool Used</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id} className="transition-colors duration-300 hover:bg-gray-700">
                <td className="px-6 py-4 text-sm">{row.scanName}</td>
                <td className="px-6 py-4 text-sm">{row.ipAddress}</td>
                <td className="px-6 py-4 text-sm">{row.date}</td>
                <td className="px-6 py-4 text-sm flex items-center gap-2">
                  <FaFilePdf className="text-red-500" />
                  <a href={`/${row.pdfFile}`} className="text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    {row.pdfFile}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm">{row.toolUsed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-6 items-center">
        <div className="text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <Button onClick={handlePrevious} disabled={currentPage === 1} className="bg-purple-600 text-white hover:bg-purple-700 text-sm">Previous</Button>
          <Button onClick={handleNext} disabled={currentPage === totalPages} className="bg-purple-600 text-white hover:bg-purple-700 text-sm">Next</Button>
        </div>
      </div>
    </div>
  );
}

export default ScanHistory;
