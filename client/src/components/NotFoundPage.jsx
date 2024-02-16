
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
	  navigate(-1);
	};
  return (
    <section className="error-page section">
	<Container>
		<Row className="row justify-content-center">
			<Col sm md="6">
				<div className="error-inner">
					<h1>404<span>Oop's  sorry we can't find that page!</span></h1>
					<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At dicta dolores doloremque numquam velit soluta veniam eveniet provident quas sit?</p>
					<Button variant="primary" onClick={handleGoBack}>Go Back</Button>
				</div>
			</Col>
		</Row>
	</Container>
</section>
  )
}

export default NotFoundPage




