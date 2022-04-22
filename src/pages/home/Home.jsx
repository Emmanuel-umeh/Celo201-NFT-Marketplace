import React, {useEffect, useState, useCallback} from 'react';
import {Nfts, Header, } from '../../components'
import {useMarketContract} from "../../hooks/useMarketContract";
import axios from "axios";
import {ethers} from "ethers";

const Home = () => {
    const marketplace = useMarketContract()


    const [nfts, setNfts] = useState([])
    const [loading, setLoading] = useState(true)

    const loadNFTs = useCallback(async ()  =>{
        try {
            const data = await marketplace.methods.fetchMarketItems().call()
            const items = await Promise.all(data.map(async i => {
                const tokenUri = await marketplace.methods.tokenURI(i.tokenId).call()
                const meta = await axios.get(tokenUri)
                let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
                return {
                    price,
                    tokenId: Number(i.tokenId),
                    seller: i.seller,
                    owner: i.owner,
                    image: meta.data.image,
                    name: meta.data.name
                }
            }))

            setNfts(items)
            setLoading(false)
        }catch (e) {
            console.log({e})
        }finally {
            setLoading(false)
        }

    }, [marketplace])

    useEffect(() => {
        if(marketplace) loadNFTs()
    }, [marketplace, loadNFTs])


  return <div>
   <Header />
   <Nfts nfts={nfts} title="Hot NFts" loading={loading}  />
  </div>;
};

export default Home;
