
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
							<p>The page you are looking it does not exist in our side..</p>
							<Button variant="primary" onClick={handleGoBack}>Go Back</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default NotFoundPage




