import React, {useEffect, useState} from 'react';
import './profile.css'
import profile_banner from '../../assets/profile_banner.png'
import Nfts from '../../components/nfts/Nfts'
import {useContractKit} from "@celo-tools/use-contractkit";
import {useMarketContract} from "../../hooks/useMarketContract";
import axios from "axios";
import {ethers} from "ethers";

const Profile = () => {

    const {address, connect, performActions} = useContractKit()
    const marketplace = useMarketContract()


    const [nfts, setNfts] = useState([]);
    const [soldNfts, setSoldNfts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (marketplace) {
            loadNFTs()
        }
    }, [ marketplace]);

    const loadNFTs = async () => {
        setLoading(true)
        try {
            const data = await marketplace.methods.fetchMyNFTs().call()
            console.log({data})
            const items = await Promise.all(data.map(async i => {
                const tokenURI = await marketplace.methods.tokenURI(i.tokenId).call()

                const owner = await marketplace.methods.getNftOwner(i.tokenId).call()
                const meta = await axios.get(tokenURI)
                let price = ethers.utils.formatUnits(i.price.toString(), 'ether')

                return {
                    price,
                    tokenId: Number(i.tokenId),
                    seller: i.seller,
                    name: meta.data.name,
                    owner,
                    image: meta.data.image,
                    tokenURI
                }
            }))

            setNfts(items)
        } catch (e) {
            console.log({e})
        } finally {
            setLoading(false)
        }


    }


    return (
        <div className='profile section__padding'>
            <div className="profile-top">
                <div className="profile-banner">
                    <img src={profile_banner} alt="banner"/>
                </div>
                <div className="profile-pic">
                    <img
                        src={"https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png"}
                        alt="profile"/>
                    <h3>Hello!</h3>
                </div>
            </div>
            <div className="profile-bottom">
                {/*<div className="profile-bottom-input">*/}
                {/*  <input type="text" placeholder='Search Item here' />*/}
                {/*  <select>*/}
                {/*    <option>Recently Listed</option>*/}
                {/*    <option>Popular</option>*/}
                {/*    <option>Low to High</option>*/}
                {/*    <option>High to Low</option>*/}
                {/*  </select>*/}
                {/*</div>*/}
                <Nfts nfts={nfts} loading={loading} title="Your Minted NFTs" relist={true}/>
            </div>
        </div>
    );
};

export default Profile;
