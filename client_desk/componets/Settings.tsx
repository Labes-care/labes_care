/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,

  TextField,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import './settings.css'
import { Button } from "@nextui-org/react";
import { CameraIcon } from './dashboardComponent/CameraIcon';
import { ToastContainer, toast } from 'react-toastify';
import { Alert, Space } from 'antd';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Modal } from 'antd';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


interface doctor {
  id: number,
  fullname: string,
  email: string,
  password: string,
  speciality: string,
  cin: string,
  phonenumber: string,
  profile_img: string,
  cover_img: string,
  address: string,
  certificate_img: string
}


export default function Setting() {
  const [doctor, setDoctor] = useState<doctor | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordUpdateMessage, setPasswordUpdateMessage] = useState('');
  const [incorrectPasswordAlert, setIncorrectPasswordAlert] = useState(false);

  const [updatedFullname, setUpdatedFullname] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhonenumber, setUpdatedPhonenumber] = useState('');
  const [updatedAddress, setUpdatedAddress] = useState('');


  const [fullnameUpdateSuccess, setFullnameUpdateSuccess] = useState(false);
  const [emailUpdateSuccess, setEmailUpdateSuccess] = useState(false);
  const [phonenumberUpdateSuccess, setPhonenumberUpdateSuccess] = useState(false);
  const [addressUpdateSuccess, setAddressUpdateSuccess] = useState(false);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);

  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(null);

  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  

  const [updatingCoverImage, setUpdatingCoverImage] = useState(false);
  const [updatingProfileImage, setUpdatingProfileImage] = useState(false);
  


  
 

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedProfileImage(e.target.files[0]);
     
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedCoverImage(e.target.files[0]);
      setCoverImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };


  const uploadProfileImage = async () => {


    setUpdatingProfileImage(true)
    try {
      const formData = new FormData();
      if (selectedProfileImage !== null) {
        formData.append('profile_img', selectedProfileImage);
      }

      const response = await fetch(`http://localhost:3003/updateProfileImg/${searchParams.id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle success
        // Update the doctor's profile image in the state

        toast.success('Profile Image updated successfully');


        if (doctor && selectedProfileImage) {
          const imageUrl = URL.createObjectURL(selectedProfileImage);

          setDoctor({
            ...doctor,
            profile_img: imageUrl,
          });
        }
      } else {
        // Handle error
        toast.error('Failed to update Profile Image');
        console.error('An error occurred:', error);

        setUpdatingProfileImage(false)
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred while updating Profile Image');
      setUpdatingProfileImage(false)
    }
  };

  const uploadCoverImage = async () => {


    if (!selectedCoverImage) {
      return;
    }
    setUpdatingCoverImage(true)
    try {
      const formData = new FormData();
      if (selectedCoverImage !== null) {
        formData.append('cover_img', selectedCoverImage);
      }


      const response = await fetch(`http://localhost:3003/uploadCoverImage/${searchParams.id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle success
        // Update the doctor's profile image in the state

        toast.success('Cover Image updated successfully');


        if (doctor && selectedCoverImage) {
          const imageUrl = URL.createObjectURL(selectedCoverImage);

          setDoctor({
            ...doctor,
            cover_img: imageUrl,
          });
        }
      } else {
        // Handle error
        toast.error('Failed to update Cover Image');
        console.error('An error occurred:', error);
        setUpdatingCoverImage(false)
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred while updating Cover Image');
      setUpdatingCoverImage(false)
    }
  };


  const searchParams = useParams()

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      if (!searchParams.id) return
      try {
        const response = await fetch(`http://localhost:3003/DoProfile/${searchParams.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch doctor profile');
        }
        const doctorData = await response.json();
        setDoctor(doctorData);
        console.log("response", doctorData.Doctor)

      } catch (err) {
        setError(error);

      }
    };

    fetchDoctorProfile();
  }, [error, searchParams.id]);

  const setSuccessStateWithTimeout = (setStateFunction: React.Dispatch<React.SetStateAction<boolean>>) => {
    setStateFunction(true);
    setTimeout(() => {
      setStateFunction(false);
    }, 2000); // 2000 milliseconds (2 seconds) delay
  };

  const handlePasswordUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3003/updatePassword/${searchParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setPasswordUpdateMessage('Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
        setIncorrectPasswordAlert(false); // Reset the incorrect password alert
        setPasswordUpdateSuccess(true)
        fetchDoctorProfile()
      } else {
        setPasswordUpdateMessage(data.message);
        setIncorrectPasswordAlert(true); // Show incorrect password alert
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setPasswordUpdateMessage('An error occurred');
    }
  };

  const handleUpdateFullname = async () => {
    try {
      const response = await fetch(`http://localhost:3003/updateFullname/${searchParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname: updatedFullname }),
      });

      const data = await response.json();

      if (data.success) {

        if (doctor) {
          setDoctor({
            ...doctor,
            fullname: updatedFullname,
          });
        }

        setUpdatedFullname('');
        setFullnameUpdateSuccess(true)
        toast.success('FullName Updated successfully');

      }
    } catch (error) {
      console.error('An error occurred');

    }
  };

  const handleUpdateEmail = async () => {
    try {
      const response = await fetch(`http://localhost:3003/updateEmail/${searchParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: updatedEmail }),
      });

      const data = await response.json();

      if (data.success) {

        if (doctor) {
          setDoctor({
            ...doctor,
            email: updatedEmail,
          });
        }

        setUpdatedEmail('');
        setEmailUpdateSuccess(true)
        toast.success('Email Updated successfully');

      }
    } catch (error) {
      console.error('An error occurred');

    }
  };

  const handleUpdatePhonenumber = async () => {
    try {
      const response = await fetch(`http://localhost:3003/updatePhonenumber/${searchParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phonenumber: updatedPhonenumber }),
      });

      const data = await response.json();

      if (data.success) {

        if (doctor) {
          setDoctor({
            ...doctor,
            phonenumber: updatedPhonenumber,
          });
        }

        setUpdatedPhonenumber('');
        setPhonenumberUpdateSuccess(true)
        toast.success('PhoneNumber Updated successfully');

      }
    } catch (error) {
      console.error('An error occurred');

    }
  };

  const handleUpdateAddress = async () => {
    try {
      const response = await fetch(`http://localhost:3003/updateAddress/${searchParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: updatedAddress }),
      });

      const data = await response.json();

      if (data.success) {

        if (doctor) {
          setDoctor({
            ...doctor,
            address: updatedAddress,
          });
        }

        setUpdatedAddress('');
        setAddressUpdateSuccess(true)
        toast.success('Address Updated successfully');

      }
    } catch (error) {
      console.error('An error occurred');

    }
  };
  const showUpdateCoverImageModal = () => {
    Modal.confirm({
      title: 'Update Cover Image',
      content: 'Are you sure you want to update the cover image?',
      onOk: uploadCoverImage, // This function will be called when clicking "Update" button
      onCancel: () => { }, // No action needed when clicking "Exit" button
    });
  };
  const showUpdateProfileImageModal = () => {
    Modal.confirm({
      title: 'Update Profile Image',
      content: 'Are you sure you want to update the profile image?',
      onOk: uploadProfileImage, // This function will be called when clicking "Update" button
      onCancel: () => { }, // No action needed when clicking "Exit" button
    });
  };

  return (
    <div className='dashboard'>
      <h2 className='fileplace'>Doctor Dashboard <ArrowForwardIosIcon/>  Settings</h2>
    <div></div>
    <div >
      <Container >
        <ToastContainer />
        <Grid >
          <Grid className='content'>
            <Card >
              <CardMedia
                className='cardMedia'
                image={doctor?.cover_img}
                title="Profile Image"
              >
                <form encType="multipart/form-data">
                  <div className="cover-image-container">
                    {coverImagePreview ? (
                      <img src={coverImagePreview} alt="Cover" className="cover-image" />
                    ) : (
                      <img src={doctor?.cover_img} alt="Cover" className="cover-image" />
                    )}
                    <label htmlFor="coverImageInput" className="camera-icon">
                      <img
                        className='cameracover'
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACz0lEQVR4nO2Zz29MURTHP7rRMkSlNi3dof4MOmNlwWwJxbLRWEiRJigLlI34O6iF1MZKWDAdEkFH7XSvP236w5Mr35u8TN7E+3HfnWnyTvJNXubNPfd+5p533jl3oLDCCmuH7QSuAd+ATSCIqU3gq8YaH221XcDrBItvpTdAqZ0gTx1ABNKTrIt5958J3rYYNwisOwRZl8/UFmeSKLvtECKQbqUBGADu57AYV1oDPgL3gAOtIM4Bqx2w2CCmloFqM8RZ4E8HLC5IqK0wjAmnlQ5YVFot2TDz8Uw0gAfAMDAE7JbMdRl4CHzP4H/SgHyOuPFSO3UQmMkwQQ04kSDZDAOzKeYxCYDfETcMgLVDKfP/KLBDPvYDl4AX2p01yVxPAxeBXn3XjLkCbCSYzzwakTeygPwCjmtsDzChDBMn1m9qjN2dxQTzRn44IxgD8SrhTliIgZRhUtNYCxN3Z1LHf5RGQxALGfwshGDGfIPUFN89KXeiWR+AbqALqPsEsdlpwqHP6/JZ9gXSCGWnJYcgi6FsNu8DxLxUjV12CBFII/I95QPEbD16T7gGeS7fFR8ghzXZjxxAGvJ91AeI7a3zaANW5bvkA2RPjiDL8r3XB8gRTZalgm2lOfke8vmwT+cA8ky+T/oAMf0EqmJdg5yX78c+QGxm6c3hhbjP5wsxUKWKSnFXPsdjhpVTkFkVjd0qILP6ex8qGj/5BAnU2bko438C/fJ1NeYYpyAboRDr16+apv8eDFW9bWms7ANqYUxo3IjZsprvjIf+Tqi4aHVd7MyY4ttmsxEVgHOqAFZ1bT67EMpOXQqnJIcP/0DyPJz7ApwivpVjdoORZUycjJBV8+onKio1StIxpdZHGSvnugG56wEkb91B56Zxzp06VUtAn43Nqk62g22mLeB084NWdVwn+diJM62yRp9Otusd+qfPitY2GQ6nwgorrDC2nf0FxZxxcblnBPsAAAAASUVORK5CYII="
                        alt="Camera Icon"
                      />
                      <input
                        id="coverImageInput"
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        style={{ display: "none" }} // Hide the input element
                      />
                    </label>
                  </div>
                  {!updatingCoverImage && selectedCoverImage && (
                    <Button onClick={showUpdateCoverImageModal} className='UpdateCoverImage'>Apply</Button>
                  )}
                  {updatingCoverImage}
                </form>
                <Typography className='drName' variant='h3'>Dr  {doctor?.fullname}</Typography>
                <img
                  src={doctor?.profile_img}
                  alt="Profile"
                  className="profileimg circular-profile-img"

                />
                <form encType="multipart/form-data">
                <label htmlFor="profileImageInput" className="camera-icon">
                      <img
                        className='cameraprofile'
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACz0lEQVR4nO2Zz29MURTHP7rRMkSlNi3dof4MOmNlwWwJxbLRWEiRJigLlI34O6iF1MZKWDAdEkFH7XSvP236w5Mr35u8TN7E+3HfnWnyTvJNXubNPfd+5p533jl3oLDCCmuH7QSuAd+ATSCIqU3gq8YaH221XcDrBItvpTdAqZ0gTx1ABNKTrIt5958J3rYYNwisOwRZl8/UFmeSKLvtECKQbqUBGADu57AYV1oDPgL3gAOtIM4Bqx2w2CCmloFqM8RZ4E8HLC5IqK0wjAmnlQ5YVFot2TDz8Uw0gAfAMDAE7JbMdRl4CHzP4H/SgHyOuPFSO3UQmMkwQQ04kSDZDAOzKeYxCYDfETcMgLVDKfP/KLBDPvYDl4AX2p01yVxPAxeBXn3XjLkCbCSYzzwakTeygPwCjmtsDzChDBMn1m9qjN2dxQTzRn44IxgD8SrhTliIgZRhUtNYCxN3Z1LHf5RGQxALGfwshGDGfIPUFN89KXeiWR+AbqALqPsEsdlpwqHP6/JZ9gXSCGWnJYcgi6FsNu8DxLxUjV12CBFII/I95QPEbD16T7gGeS7fFR8ghzXZjxxAGvJ91AeI7a3zaANW5bvkA2RPjiDL8r3XB8gRTZalgm2lOfke8vmwT+cA8ky+T/oAMf0EqmJdg5yX78c+QGxm6c3hhbjP5wsxUKWKSnFXPsdjhpVTkFkVjd0qILP6ex8qGj/5BAnU2bko438C/fJ1NeYYpyAboRDr16+apv8eDFW9bWms7ANqYUxo3IjZsprvjIf+Tqi4aHVd7MyY4ttmsxEVgHOqAFZ1bT67EMpOXQqnJIcP/0DyPJz7ApwivpVjdoORZUycjJBV8+onKio1StIxpdZHGSvnugG56wEkb91B56Zxzp06VUtAn43Nqk62g22mLeB084NWdVwn+diJM62yRp9Otusd+qfPitY2GQ6nwgorrDC2nf0FxZxxcblnBPsAAAAASUVORK5CYII="
                        alt="Camera Icon"
                      />
                      <input
                        id="profileImageInput"
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        style={{ display: "none" }} // Hide the input element
                      />
                    </label>
                    {!updatingProfileImage && selectedProfileImage && (
                    <Button onClick={showUpdateProfileImageModal} className='UpdateProfileImage'><h4>Apply</h4></Button>
                  )}
                  {updatingProfileImage}
                </form>
                {/* <img onClick={uploadProfileImage} className='camera' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACz0lEQVR4nO2Zz29MURTHP7rRMkSlNi3dof4MOmNlwWwJxbLRWEiRJigLlI34O6iF1MZKWDAdEkFH7XSvP236w5Mr35u8TN7E+3HfnWnyTvJNXubNPfd+5p533jl3oLDCCmuH7QSuAd+ATSCIqU3gq8YaH221XcDrBItvpTdAqZ0gTx1ABNKTrIt5958J3rYYNwisOwRZl8/UFmeSKLvtECKQbqUBGADu57AYV1oDPgL3gAOtIM4Bqx2w2CCmloFqM8RZ4E8HLC5IqK0wjAmnlQ5YVFot2TDz8Uw0gAfAMDAE7JbMdRl4CHzP4H/SgHyOuPFSO3UQmMkwQQ04kSDZDAOzKeYxCYDfETcMgLVDKfP/KLBDPvYDl4AX2p01yVxPAxeBXn3XjLkCbCSYzzwakTeygPwCjmtsDzChDBMn1m9qjN2dxQTzRn44IxgD8SrhTliIgZRhUtNYCxN3Z1LHf5RGQxALGfwshGDGfIPUFN89KXeiWR+AbqALqPsEsdlpwqHP6/JZ9gXSCGWnJYcgi6FsNu8DxLxUjV12CBFII/I95QPEbD16T7gGeS7fFR8ghzXZjxxAGvJ91AeI7a3zaANW5bvkA2RPjiDL8r3XB8gRTZalgm2lOfke8vmwT+cA8ky+T/oAMf0EqmJdg5yX78c+QGxm6c3hhbjP5wsxUKWKSnFXPsdjhpVTkFkVjd0qILP6ex8qGj/5BAnU2bko438C/fJ1NeYYpyAboRDr16+apv8eDFW9bWms7ANqYUxo3IjZsprvjIf+Tqi4aHVd7MyY4ttmsxEVgHOqAFZ1bT67EMpOXQqnJIcP/0DyPJz7ApwivpVjdoORZUycjJBV8+onKio1StIxpdZHGSvnugG56wEkb91B56Zxzp06VUtAn43Nqk62g22mLeB084NWdVwn+diJM62yRp9Otusd+qfPitY2GQ6nwgorrDC2nf0FxZxxcblnBPsAAAAASUVORK5CYII="/>          */}
              </CardMedia>
              <CardContent className='cardcontent1'>
                <h2>Iformation Of Profile</h2>
                <Typography></Typography>
                <Typography variant='h6'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABwUlEQVR4nO2VvUpDQRCFvxeIQtAUYgoLbRR8AkH8wV5iSl/BUlAbTQpbeyvBQtFGoxaCisHSn0JSCAEtUmkgRgsRzcrCCSwXjbnJ3kLwwMBmZzPn7MzsXPiHXySALHANvMqugIx8kWIGqALmB7O+VJTkNRHtAZNADOgCpoAz+WpRiEg4N18EBoBd7VW1tntLOvMMdPsUkHVubokq36S/LN+Bfq/4FHCjoBO6rRFRL9AD9GlvBxjX2jamN1QVNKb0GpFfAHmdMcpMp9OQkQvIA+eOAOOs7TlvuFbQMacEh0BSJYg7YpJRlCCjoDk1WjnQgDkJseRH2luO6hkuAP3KRL0cQatoPnhFyhlEOXV7B7AZILdnpn2TuyJ+unX95pGR19GtIXMJvMguVXPvafeOdeCjQQpbseMwAp48k1t7DCNgEih5JC8pZtPYB4aANeCzDWL71DaAQWA7jACjpzIHjAC3LZDfaQbMOhMxlAAjs1+yYWAeeGuC+B1YVQZPAr6WBJhfgoYR27IAIyuoJGngVKkta52Wr9Dg/20LMGrKLWBUn9e41ltNNKwXAaYN+zsCHiIgvw8jYAIoeiQvKuY/aIQvkHN4EnOHRIcAAAAASUVORK5CYII=" />


                  email:   {doctor?.email}</Typography><br />
                <Typography variant='h6'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAABdUlEQVR4nO3US0tVYRQG4Cdy0AUvRI27zRX/gSJCFDlokJ4TOukXSHNH/gEH5QWd+AckiogQFIRoEDh05szooiiRHgn0yBcr2BzOPjtPHojwhbVZe7N432+9a32bc/xvaEcpIuVniit4iEX8QDXiEK8who6zJs+Lw9OIJivKWEIlh3AvxNcbiFaCo1xrb08B+TGWMYJLuIk3f9BlVjRp/Hq8jPazRV8xibsh8ASrIVxtRug3usLnJDgec0oFU9hpgryct5ldMYPH8d6N13U6bYo8iyF8wgU8wyDa0InRsLfSgPwi+vBcASbwLvLNIPuGWQwEUUcQlzLk/XiBz5lD5OJOWLSPW7hfx560HDO4FzGNLzlW5uJ2CB2E0NVTDL9aE0dF1i3gQ+SP/kLobZFQuu1bkV+OoeZd4mqd+BnzbPgL6o3i7zXfr+Ep5qLbtCS72MYG1jCPYVwv6iSt80oIJaKWYTLTfjp5y/AAH/EeN1opdI5/GydLUszykCqBGQAAAABJRU5ErkJggg==" />
                  Speciality:  {doctor?.speciality}</Typography><br />
                <Typography variant='h6'><LocalPhoneIcon /> Phonenumber:   {doctor?.phonenumber}</Typography><br />
                <Typography variant='h6'> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZklEQVR4nO2WMU4CQRSGPy3QxJhoZaEWaqlegpOotYbOWi5gIBptpeICgpVmxRuIlrQcQFEaUfOSN8lEd2aXmd2OL3nJZvbN/4WZYQBm+NkHmsALMNKS5wawRwksAFfABPhx1BdwCVSKlD54hH/rvij59RRSUxdF7OkkQCzLvhsjbgZITZ3HiF8dobfAOrABdB09/RjxmyNUhIZNR4/MDeYzQvwRI+47QrsqF+mdo+c5RlyPOFwyN5g1YBwgHevcKE4CxMcUwBzQnkLa1jmFUAE6OaSdmHt6Hni0wk51fNFzWZiTLj3oHDOeaGYm1ZTQmiXvpbzvWdJayvtqHnEr4+uwCgyt0KGOpXGmPa0s6bL+q/gGdjx9B5ZYnl1sa9ZIs50capjssY8VSyzPPhLtk2wn5lAdkc2T7m0WmR9mK++yTMkS8O7bvnregxDAjWbLYfvHIOIHIW8N0sT2pVFWJSWs5gy8/AK1+CkUYSzUyQAAAABJRU5ErkJggg==" />


                  Address:   {doctor?.address}</Typography>
              </CardContent>
              <CardContent >
                <Grid>
                  <h3>Account Settings</h3>

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fullname"
                    label="fullname"
                    name="fullname"
                    variant="standard"
                    autoComplete="fullname"
                    autoFocus
                    value={updatedFullname}
                    onChange={(e) => setUpdatedFullname(e.target.value)}
                  />
                  <Button className='buttons' onClick={() => {
                    handleUpdateFullname();
                    setSuccessStateWithTimeout(setFullnameUpdateSuccess);
                  }}>Apply {fullnameUpdateSuccess && <span style={{ color: 'green' }}>✓</span>}</Button>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    variant="standard"
                    autoComplete="email"
                    autoFocus
                    value={updatedEmail}
                    onChange={(e) => setUpdatedEmail(e.target.value)}
                  />
                  <Button className='buttons' onClick={() => {
                    handleUpdateEmail();
                    setSuccessStateWithTimeout(setEmailUpdateSuccess);
                  }}>Apply {emailUpdateSuccess && <span style={{ color: 'green' }}>✓</span>}</Button>

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phonenumber"
                    label="phonenumber"
                    name="phonenumber"
                    variant="standard"
                    autoComplete="phonenumber"
                    autoFocus
                    value={updatedPhonenumber}
                    onChange={(e) => setUpdatedPhonenumber(e.target.value)}
                  />
                  <Button className='buttons' onClick={() => {
                    handleUpdatePhonenumber();
                    setSuccessStateWithTimeout(setPhonenumberUpdateSuccess);
                  }}>Apply {phonenumberUpdateSuccess && <span style={{ color: 'green' }}>✓</span>}</Button>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="address"
                    name="address"
                    variant="standard"
                    autoComplete="address"
                    autoFocus
                    value={updatedAddress}
                    onChange={(e) => setUpdatedAddress(e.target.value)}
                  />
                  <Button className='buttons' onClick={() => {
                    handleUpdateAddress();
                    setSuccessStateWithTimeout(setAddressUpdateSuccess);
                  }}>Apply{addressUpdateSuccess && <span style={{ color: 'green' }}>✓</span>}</Button>
                </Grid>
                <Grid>
                  <h2>Security Settings</h2>

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Current Password"
                    label="Current Password"
                    name="Current Password"
                    variant="standard"
                    autoComplete="Current Password"
                    autoFocus
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="New Password"
                    label="New Password"
                    name="New Password"
                    variant="standard"
                    autoComplete="New Password"
                    autoFocus
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {incorrectPasswordAlert && <Typography style={{ color: 'red' }}>Incorrect current password</Typography>}
                  <Button className='buttons' onClick={handlePasswordUpdate}>Apply {passwordUpdateSuccess && <span style={{ color: 'green' }}>✓</span>}</Button>
                  {passwordUpdateMessage && <Typography>{passwordUpdateMessage}</Typography>}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
    </div>
  );
};


function fetchDoctorProfile() {
  throw new Error('Function not implemented.');
}

