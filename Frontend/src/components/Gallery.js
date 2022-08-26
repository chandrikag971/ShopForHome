import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Card from './Card'
import "./CSS/gallery.css"

function Gallery() {
    const { categoryValue } = useParams();
    const location = useLocation()
    
    const [productData, setProductData] = useState([]);
    const [sortOption, setSortOption] = useState("name-a");

    useEffect(() => {
        if (location.pathname === '/') {
            fetch(`http://localhost:9000/user/products/tags/featured`).then(res => res.json()).then(result => {
                setProductData(result);
                console.log(result)
            })
        }
        else {
            fetch(`http://localhost:9000/user/products/tags/${categoryValue.toLowerCase()}`).then(res => res.json()).then(result => {

            if(sortOption === "name-d"){
                result.sort((a,b)=>{return (a.productName<b.productName? -1:1)})
            }
            else if(sortOption === "name-a"){
                result.sort((a,b)=>{return (a.productName<b.productName? 1:-1)})
            }
            if(sortOption === "price-d"){
                result.sort((a,b)=>{return (a.price<b.price? 1:-1)})
            }
            if(sortOption === "price-a"){
                result.sort((a,b)=>{return (a.price<b.price? -1:1)})
            }
            setProductData(result);
            console.log(result)
            })
        }
    }, [categoryValue, location.pathname, sortOption])


    return (
        <>
            {categoryValue &&
                <div className='container'>
            <div>
                    <button className="btn btn-primary mx-1 my-2  "  onClick={()=>{setSortOption("name-d")}} >Name: A - Z</button>
                    <button className="btn btn-primary mx-1 my-2  "  onClick={()=>{setSortOption("name-a")}} >Name: Z - A</button>
                    <button className="btn btn-primary mx-1 my-2  "  onClick={()=>{setSortOption("price-d")}} >Price: High to Low</button>
                    <button className="btn btn-primary mx-1 my-2  "  onClick={()=>{setSortOption("price-a")}} >Price: Low to High</button>
                </div>
            </div>}
            <div className='appWrapper homeGalleryView'>
                {productData.map((product) => {
                    return (
                        <Card key={product.productName} productValue={product}></Card>
                    )
                })}
            </div>
        </>
    )
}

export default Gallery
