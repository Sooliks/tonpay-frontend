'use client'
import React from 'react';


type ProfilePageProps = {
    params: {
        id: string
    }
}
const FeedbacksPage = ({params}: ProfilePageProps) => {
    return (
        <div>
            feedbacks profile page {params.id}
        </div>
    );
};

export default FeedbacksPage;