import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'white', color: 'black', py: 3, mt: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Connect with Us
            </Typography>
            <IconButton 
              color="inherit" 
              href="https://www.facebook.com" 
              target="_blank"
              sx={{ 
                '&:hover': { 
                  bgcolor: '#1abc9c',
                  color: 'white'
                } 
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton 
              color="inherit" 
              href="https://www.twitter.com" 
              target="_blank"
              sx={{ 
                '&:hover': { 
                  bgcolor: '#1abc9c',
                  color: 'white'
                } 
              }}
            >
              <Twitter />
            </IconButton>
            <IconButton 
              color="inherit" 
              href="https://www.instagram.com" 
              target="_blank"
              sx={{ 
                '&:hover': { 
                  bgcolor: '#1abc9c',
                  color: 'white'
                } 
              }}
            >
              <Instagram />
            </IconButton>
            <IconButton 
              color="inherit" 
              href="https://www.linkedin.com" 
              target="_blank"
              sx={{ 
                '&:hover': { 
                  bgcolor: '#1abc9c',
                  color: 'white'
                } 
              }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton 
              color="inherit" 
              href="https://www.youtube.com" 
              target="_blank"
              sx={{ 
                '&:hover': { 
                  bgcolor: '#1abc9c',
                  color: 'white'
                } 
              }}
            >
              <YouTube />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link 
              href="#" 
              color="inherit" 
              display="block" 
              gutterBottom
              sx={{
                '&:hover': {
                  bgcolor: '#1abc9c',
                  color: 'white'
                }
              }}
            >
              Home
            </Link>
            <Link 
              href="#" 
              color="inherit" 
              display="block" 
              gutterBottom
              sx={{
                '&:hover': {
                  bgcolor: '#1abc9c',
                  color: 'white'
                }
              }}
            >
              About Us
            </Link>
            <Link 
              href="#" 
              color="inherit" 
              display="block" 
              gutterBottom
              sx={{
                '&:hover': {
                  bgcolor: '#1abc9c',
                  color: 'white'
                }
              }}
            >
              Services
            </Link>
            <Link 
              href="#" 
              color="inherit" 
              display="block" 
              gutterBottom
              sx={{
                '&:hover': {
                  bgcolor: '#1abc9c',
                  color: 'white'
                }
              }}
            >
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Details
            </Typography>
            <Typography variant="body2">
              Address: 123 Street Name, City, Country
            </Typography>
            <Typography variant="body2">
              Phone: (123) 456-7890
            </Typography>
            <Typography variant="body2">
              Email: info@example.com
            </Typography>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={4}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
