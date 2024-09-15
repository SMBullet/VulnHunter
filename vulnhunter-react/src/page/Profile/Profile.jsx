import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MailIcon, PhoneIcon, MapPinIcon, BriefcaseIcon, GlobeIcon, UploadIcon } from 'lucide-react';

const Profile = () => {
  const auth = useSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(auth.user?.avatarUrl);
  const fileInputRef = useRef(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 p-6">
      <Card className="max-w-4xl mx-auto bg-gray-900 shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="relative pb-0">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-700 to-indigo-800 opacity-50"></div>
          <div className="relative z-10 flex items-end space-x-6 pt-16">
            <div className="relative group">
              <Avatar className="h-32 w-32 ring-4 ring-gray-800 bg-gray-700 cursor-pointer transition-opacity duration-300">
                <AvatarImage src={avatarUrl} alt={auth.user?.name} />
                <AvatarFallback className="text-3xl">
                  {auth.user?.name[0].toUpperCase()}
                  {auth.user?.lastName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div 
                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center rounded-full"
                onClick={handleAvatarClick}
                style={{ borderRadius: '50%' }}
              >
                <div className="text-white text-center">
                  <UploadIcon className="mx-auto mb-2" />
                  <span>Add Avatar</span>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="pb-4">
              <CardTitle className="text-3xl font-bold text-gray-100">
                {auth.user?.name} {auth.user?.lastName}
              </CardTitle>
              <p className="text-lg text-gray-300">{auth.user?.title || 'Software Developer'}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-800">
              <TabsTrigger value="about" className="data-[state=active]:bg-gray-700">About</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-gray-700">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MailIcon className="text-blue-400" />
                    <span>{auth.user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="text-blue-400" />
                    <span>{auth.user?.phone || '+1 (555) 123-4567'}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={openModal} variant="outline" className="bg-blue-600 text-gray-100 hover:bg-blue-700 transition-colors">
                  Edit Profile
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="activity">
              <p className="text-gray-400">Recent activity will be displayed here.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onClose={closeModal}>
        <DialogContent className="bg-gray-800 text-gray-200" onPointerDownOutside={closeModal}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue={auth.user?.name} className="bg-gray-700 text-gray-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue={auth.user?.lastName} className="bg-gray-700 text-gray-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={auth.user?.email} className="bg-gray-700 text-gray-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="email" defaultValue={auth.user?.phone} className="bg-gray-700 text-gray-200" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={closeModal} variant="outline" className="bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors">
              Cancel
            </Button>
            <Button onClick={closeModal} className="bg-blue-600 text-gray-100 hover:bg-blue-700 transition-colors">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Profile;