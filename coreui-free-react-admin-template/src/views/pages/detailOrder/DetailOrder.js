import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import Progress from '../../base/progress/Progress';

const DetailOrder = () => {

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <Progress />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DetailOrder;
