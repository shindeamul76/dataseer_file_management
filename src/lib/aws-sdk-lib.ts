

import { AWS_ACCESS_KEY, AWS_SCRETE_ACCESS_KEY } from '@main/config';
import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SCRETE_ACCESS_KEY
  });
  

export const s3 = new AWS.S3();
