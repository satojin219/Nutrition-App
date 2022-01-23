import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Header } from '../components/Header'
import { TotalIntake } from '../components/TotalIntake'
import { Menu } from '../components/Menu'
import { Modal } from '../components/Calendar'

const Home: NextPage = () => {
  return (
    <div className="font-fancy">
      <Head>
        <title>Nutrition App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@500&family=Yomogi&family=Zen+Maru+Gothic:wght@900&display=swap" rel="stylesheet"></link>
      </Head>

      <Header/>

      
     

 
    </div>
  )
}

export default Home
