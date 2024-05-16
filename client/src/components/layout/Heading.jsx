import React from 'react'
import { Breadcrumb, Card, CardHeader } from 'react-bootstrap'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Heading = ({ heading, breadcrumb }) => {
    return (
        <Card className="shadow-sm border-0 p-3 mb-3">
            <CardHeader className="bg-white border-0 py-0 d-flex justify-content-between align-items-center">
                <h4 className="mb-0">{heading}</h4>


                <div className="d-flex justify-content-between align-items-center text-muted">
                    <span>{breadcrumb}</span>

                </div>
            </CardHeader>
        </Card>
    )
}

export default Heading