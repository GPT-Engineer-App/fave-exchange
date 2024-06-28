import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile, deleteUser } from 'firebase/auth';
import { useAuth } from './AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Profile = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName || '');
      setBio(currentUser.bio || '');
      setProfilePicture(currentUser.photoURL || null);
    }
  }, [currentUser]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: profilePicture,
      });
      // Update bio in your database if needed
    } catch {
      setError('Failed to update profile');
    }

    setLoading(false);
  };

  const handleDeleteProfile = async () => {
    try {
      setError('');
      setLoading(true);
      const auth = getAuth();
      await deleteUser(auth.currentUser);
      // Delete user data from your database if needed
    } catch {
      setError('Failed to delete profile');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-center text-2xl mb-4">Profile</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="bio">Bio</Label>
          <Input type="text" id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <div className="mb-4">
          <Label htmlFor="profile-picture">Profile Picture URL</Label>
          <Input type="text" id="profile-picture" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
        </div>
        <Button disabled={loading} type="submit">
          Update Profile
        </Button>
      </form>
      <Button variant="destructive" onClick={handleDeleteProfile} disabled={loading}>
        Delete Profile
      </Button>
    </div>
  );
};

export default Profile;