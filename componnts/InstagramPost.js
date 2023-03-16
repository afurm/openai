import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function InstagramPost({ text }) {

  return (
    <Card css={{
      maxWidth: 600,
      margin: 'auto',
    }}>
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InstagramPost;
