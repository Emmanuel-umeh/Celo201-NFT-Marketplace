import React, {useCallback, useEffect, useState} from 'react';
import './itemRelist.css'
import axios from "axios";
import {ethers} from "ethers";
import {useParams} from "react-router";
import {useContractKit} from "@celo-tools/use-contractkit";
import {useMarketContract} from "../../hooks/useMarketContract";
import {useNavigate} from "react-router-dom";

const ItemRelist = () => {

    const {id} = useParams()
    const marketplace = useMarketContract()
    const [nftData, setNftData] = useState({});
    const {address, performActions} = useContractKit()


    const fetchNft = useCallback(async () => {
        const tokenUri = await marketplace.methods.tokenURI(id).call()
        let meta = await axios.get(tokenUri)
        meta.data.owner =  await marketplace.methods.getNftOwner(id).call()
        setNftData(meta.data)
    }, [marketplace, id])

    const navigate = useNavigate()
    useEffect(() => {
        if (marketplace) fetchNft()
    }, [marketplace, fetchNft]);


    // const [newPrice, setNewPrice] = useState(0);
    const listNFTForSale = async () => {

        await performActions(async (kit) => {
            if (!nftData.price) {
                return alert("Enter a valid price")
            }
            const priceFormatted = (ethers.utils.parseUnits(nftData.price, 'ether')).toString()
            await marketplace.methods.resellToken(id, priceFormatted).send({
                from: address
            })
            alert("NFT listed for sale!")

            navigate("/")
        })



    }


    const purchaseNft = async () => {

        try {


            await performActions(async (kit) => {
                const {defaultAccount} = kit;
                /* user will be prompted to pay the asking proces to complete the transaction */
                const price = (ethers.utils.parseUnits(nftData.price, 'ether')).toString()
                await marketplace.methods.createMarketSale(id).send({
                    from: defaultAccount,
                    value: price
                })
                alert(`You have successfully purchased this NFT!`)
                navigate(`/profile`)
            })
        } catch (error) {
            console.log({error});
        }


    }


    return (
        <div className='item section__padding'>
            <div className="item-image">
                <img src={nftData.image} alt="item"/>
            </div>
            <div className="item-content">
                <div className="item-content-title">
                    <h1>{nftData.name}</h1>
                    <p>Costs <span>{nftData.price} CUSD</span> .</p>
                </div>
                <div className="item-content-creator">
                    <div><p>Creater</p></div>
                    <div>
                        <img src={"https://beebom.com/wp-content/uploads/2022/02/Featured.jpg?w=750&quality=75"}
                             alt="creator"/>
                        <p>{nftData.owner || "Anonymous"}  </p>
                    </div>
                </div>
                <div className="item-content-detail">
                    <p>{nftData.description}</p>
                </div>

                {nftData.owner === address ?
                    <form className='writeForm' autoComplete='off' onSubmit={(e)=>e.preventDefault()}>

                        <div className="formGroup">
                            {/*<input onChange={(e) => setNewPrice(e.target.value)} type="text"*/}
                            {/*       placeholder='New Price of NFT'*/}
                            {/*       autoFocus={true}/>*/}
                            <button className="primary-btn"
                                    onClick={listNFTForSale}>Relist NFT
                            </button>

                        </div>


                    </form>

                    :
                    <div className="item-content-buy">
                        <button className="primary-btn" onClick={purchaseNft}>Buy For {nftData.price} CUSD</button>
                        {/*<button className="secondary-btn">Make Offer</button>*/}
                    </div>

                }
            </div>
        </div>
    )
};

export default ItemRelist;
