import React, { useEffect, useState } from 'react'
import "./CSS/gallery.css"
import WishlistCard from './WishlistCard';

function WishlistGallery() {

    const [productData, setProductData] = useState([]);
    const [sortOption, setSortOption] = useState("name-a");
    const [wishList, setWishList] = useState([])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userData")).data

        fetch(`http://localhost:9000/user/wishlist/username/${user.username}`, {headers:{"token": user.token}}).then(res => res.json()).then(async (result) => {                
                setWishList(result)
                const array = await Promise.all(result.map(async (item) => {
                    const response = await fetch(`http://localhost:9000/admin/products/id/${item.product_name}`)
                    const data = await response.json();
                    return data;
                }))
                setProductData(array);
            })
    }, [sortOption])

    return (
        <div className='appWrapper homeGalleryView'>
            {productData.map((product,index)=>{
                return(
                    <WishlistCard key = {product.productName} productValue={product} cart = {wishList[index]}></WishlistCard>
                )
            })}
        </div>
    )
}

export default WishlistGallery
