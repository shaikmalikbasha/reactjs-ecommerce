import React , {Component} from 'react';
import { Container, Row , Col ,Card } from 'react-bootstrap';
import NotFound from './NotFound';
import {Link} from 'react-router-dom';
import Header from './Header';
// {window.location.reload(false)}
class SearchProducts extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            items : [],
            hint : '',
            itemsCount : 0,
            foundStatus : true,
            isLoaded : true,
            reloadStatus : true,
            notFound : false,
        }
        this.getSuggestedProducts = this.getSuggestedProducts.bind(this);
    }
    getSuggestedProducts(hint)
    {
        if(this.state.itemsCount === 0 )
        {
            fetch("http://laravel.local/api/suggest/"+(hint) , {
                method : 'GET',
                headers: { 
                    'Content-Type': 'application/json'
                 }
            }).then(res => res.json()).then(json => {
                this.setState({
                    items : json,
                    itemsCount : json.length,
                    notFound : true,
                })
            }, () => {console.log("Status of notFound : ",this.state.notFound)});
        }
    }
    componentDidUpdate(prevProp){
       if(prevProp !== this.props)
       {
            const url = this.props.location.search;
            const splittingArray = url.split("=");
            const q = splittingArray[1];
            fetch("http://laravel.local/api/search/"+q , {
                method: 'GET',  
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(json => {
                this.setState({
                    isLoaded : true,
                    items : json,
                    itemsCount : json.length,
                    hint : q,
                } , () => { this.getSuggestedProducts(this.state.hint) })
            });
       }
    }
   
    componentDidMount()
    {
        console.log("Props",this.props.location.search);
        // console.log("Malik : Props",this.props.location.search);
        // console.log("Malik : Parent Props",this.props);
        // const qs = new URLSearchParams(this.props.location.search);
        // const q = qs.get('search');
        console.log("Props Is :",this.props);
        const url = this.props.location.search;
        const splittingArray = url.split("=");
        const q = splittingArray[1];
        console.log("Split is : ",splittingArray);
        console.log("Final : ",q);
        console.log("Before Updated...:",this.state.hint);

        fetch("http://laravel.local/api/search/"+q , {
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded : true,
                items : json,
                itemsCount : json.length,
                hint : q,
            } , () => { this.getSuggestedProducts(this.state.hint) })
        });
        // if(this.state.itemsCount === 0)
        // {
        //     console.log("if Block");
        // }
        // else
        // {
        //     console.log("Else block");
        // }
    }
    render()
    {
        let cardStyle = {
            marginBottom : 10,
        };
        let amountStyle = {
            color:'green'
        };
        var {isLoaded,items} = this.state;

        // if(this.state.itemsCount === 0 )
        // {
        //     // const error = '<div>No data</div>';
        //     return <div>
        //         <h1>Sorry no products Available Hint : {this.state.hint}</h1>
        //     </div>
        //     // return error;
        // }

        if(!isLoaded)
        {
            return <div align="center">Please wait it's Loading...</div>;
        }
        else
        {
            return (
                <div>
                    <Header />
                    { this.state.notFound && <NotFound /> }
                    <Container style={{marginTop:10}}>
                        <Row>
                            {items.map(item => (
                                <Col style={cardStyle} lg={3} key={item.id}>
                                    <Link to={`/product?id=${item.id}`}>
                                        <Card>
                                            <Card.Img variant="top" src={`/images/${item.logo }`} />
                                            <Card.Body>
                                                <Card.Title><b>{item.title}</b></Card.Title>
                                                <Card.Text>
                                                    <b>₹ : <span style = {amountStyle}>{item.price }</span></b>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            );
        }
    }
}
export default SearchProducts;