import React from 'react';
import {
    Row,
    Col,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
} from 'reactstrap';

const ProductCard = (props) => {
    const { products } = props;
    return (
        <Row>
            {products.map(product => <Col key={product.id} md="4">
                <Card>
                    <CardImg top width="100%" src={product.image} alt="product image" />
                    <CardBody>
                        <CardTitle>{product.name}</CardTitle>
                        <CardSubtitle>products</CardSubtitle>
                        <CardText>{product.description}</CardText>
                    </CardBody>
                </Card>
            </Col>)}
        </Row>
    );
};

export default ProductCard;
