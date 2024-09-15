import React from 'react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ScanResults from './ScanResults'

const FirstHome = () => {
  return (
    <div className="flex justify-center items-center min-h-screen mt-[-60px]">
      <div className="flex w-full max-w-7xl">
        {/* Left section with Card */}
        <div className="flex-shrink-0">
          <Card className="w-full max-w-3xl p-8 border-none ml-[-50px]">
            <CardHeader>
              <CardTitle className="text-3xl">Perform a Vulnerability Scan</CardTitle>
              <CardDescription className="text-lg">Discover vulnerabilities in your system with one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-6">
                  {/* New field for Scan Name */}
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="scan-name" className="text-xl">Name your Scan</Label>
                    <Input id="scan-name" placeholder="Enter scan name" className="text-lg py-4 px-6 w-full" />
                  </div>
                  
                  {/* Existing field for IP Address */}
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="name" className="text-xl">IP Address</Label>
                    <Input id="name" placeholder="Enter IP Address" className="text-lg py-4 px-6 w-full" />
                  </div>

                  {/* Existing field for Scanner */}
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="framework" className="text-xl">Scanner</Label>
                    <Select>
                      <SelectTrigger id="framework" className="text-lg py-4 px-6 w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="nmap">Nmap</SelectItem>
                        <SelectItem value="nikto">Nikto</SelectItem>
                        <SelectItem value="dnsenum">dnsenum</SelectItem>
                        <SelectItem value="nessus">Nessus</SelectItem>
                        <SelectItem value="dirb">Dirb</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button className="text-lg px-8 py-4">Deploy</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-300 mx-6"></div>

        {/* Right section with ScanResults */}
        <div className="flex-grow flex items-center ml-8"> {/* Added margin-left */}
          <ScanResults/>
        </div>
      </div>
    </div>
  )
}

export default FirstHome
