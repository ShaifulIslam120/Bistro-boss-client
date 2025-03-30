import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageTitle = () => {
    return (
        <div>
            <Helmet>
            <title>Bistro Boss | {title}</title>
        </Helmet>
        </div>
    );
};

export default PageTitle;
{/* <PageTitle title="Menu" /> */}