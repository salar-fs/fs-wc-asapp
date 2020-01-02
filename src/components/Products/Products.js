import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Pagination,
    PaginationItem,
    PaginationLink,
} from 'reactstrap';
import './Products.scss';

const Products = (props) => {
    const { items } = props;
    const [pageSize, setPageSize] = useState(5);
    const [lastPage, setLastPage] = useState(parseInt(items.length / pageSize) + 1);
    const [activePage, setActivePage] = useState(1);
    const startPage = activePage - 2 <= 0 ? 1 : activePage - 2;
    const pageRange = [...Array(pageSize).keys()].map(i => i + startPage);
    console.log(activePage);
    const itemsToShow = items.slice((activePage - 1) * pageSize, (activePage - 1) * pageSize + pageSize);
    console.log(itemsToShow);

    const movementHandler = (type) => {
        console.log(type);
        switch (type) {
            case 'first':
                if (activePage === 1) return;
                else setActivePage(1);
                break;
            case 'prev':
                const currentPage = (activePage - 1) < 1 ? 1 : activePage - 1
                setActivePage(currentPage);
                break;
            case 'next':
                setActivePage(activePage === lastPage ? activePage : activePage + 1);
                break;
            case 'last':
                setActivePage(lastPage)
                break;
            default:
                break;
        }
    };

    const handlePageChange = (selectedPage) => {
        setActivePage(selectedPage);
    };

    return (
        <Container>
            <Row>
                {itemsToShow.map(item => <Col key={item.id} md="4">
                    <Card>
                        <CardImg top width="100%" src={item.image} alt="product image" />
                        <CardBody>
                            <CardTitle>{item.name}</CardTitle>
                            <CardSubtitle>products</CardSubtitle>
                            <CardText>{item.description}</CardText>
                        </CardBody>
                    </Card>
                </Col>)}
            </Row>
            <div className="text-center pagination-container">
                <Pagination
                    aria-label="pagination">
                    <PaginationItem
                        disabled={activePage === 1}
                        onClick={() => movementHandler('first')}
                    >
                        <PaginationLink first />
                    </PaginationItem>
                    <PaginationItem
                        disabled={activePage === 1}
                        onClick={() => movementHandler('prev')}
                    >
                        <PaginationLink previous />
                    </PaginationItem>
                    {pageRange.map((page, index) => (
                        <PaginationItem
                            key={page}
                            active={activePage === page}
                            onClick={() => handlePageChange(page)}
                        >
                            <PaginationLink>{page}</PaginationLink>
                        </PaginationItem>
                    )
                    )}
                    <PaginationItem
                        disabled={activePage === lastPage}
                        onClick={() => movementHandler('next')}>
                        <PaginationLink next />
                    </PaginationItem>
                    <PaginationItem
                        disabled={activePage === lastPage}
                        onClick={() => movementHandler('last')}>
                        <PaginationLink last />
                    </PaginationItem>
                </Pagination>
            </div>
        </Container>
    );
}

export default Products;
