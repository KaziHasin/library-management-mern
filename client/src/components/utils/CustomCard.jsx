import React from 'react';
import { Card } from 'react-bootstrap';

const CustomCard = ({ children, className = '', ...props }) => {
  return (
    <Card className={`shadow-sm border-0 pt-4 pb-2 px-3 ${className}`} {...props}>
      {children}
    </Card>
  );
};

export default CustomCard;
