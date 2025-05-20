

// import VideoItem from "../listsElements/VideoItem.tsx";
import {JSXElementConstructor, ReactNode, } from "react";
import BodyHeader from "./BodyHeader";
// import {BASE_URL} from "../../utils/constants.tsx";
// import axios from "axios";


//
// const videoLists = [
//
//     {
//         classes: 'none',
//         title: 'Айдар',
//         description1: 'Телехикая',
//         description2: 'Мультфильм',
//         coverUrl: '/images/Group 1.png',
//         age: '4fgf бөлім'
//     },
//     {
//         classes: 'hidden:sm block',
//         title: 'А--SDD',
//         description1: 'Телехикая 8',
//         description2: 'Мультфильм***',
//         coverUrl: '/images/Group 1.png',
//         age: '5 бөлім'
//     },
//     {
//         classes: ' hidden: lg:block',
//         title: 'J-==J',
//         description1: 'Телех----икая',
//         description2: 'Мль-----тфильм',
//         coverUrl: '/images/Group 1.png',
//         age: '3 өлім'
//     },
//     {
//         classes: ' hidden:xl:block',
//         title: '0++',
//         description1: 'Телех----икая',
//         description2: 'Мль-----тфильм',
//         coverUrl: '/images/Group 1.png',
//         age: '3 өлім'
//     },
//     {
//         classes: ' hidden:2xl:block',
//         title: 'JJ--',
//         description1: 'Телех----икая',
//         description2: 'Мль-----тфильм',
//         coverUrl: '/images/Group 1.png',
//         age: '3 өлім'
//     },
//     {
//         classes: 'hidden:3xl:block',
//         title: 'JJ+J',
//         description1: 'Телех----икая',
//         description2: 'Мль-----тфильм',
//         coverUrl: '/images/Group 1.png',
//         age: '3 өлім'
//     },
//     {
//         classes: 'hidden:4xl:block',
//         title: 'JЧЫФЫJ',
//         description1: 'Телеикая',
//         description2: 'Новости',
//         coverUrl: '/images/Group 1.png',
//         age: '3 өлім'
//     }
// ]



type PropsType = {
    value?: string,
    content?:JSXElementConstructor<ReactNode> | undefined,
}

const PageBody = (props: PropsType) => {
    return (
        <main className="relative w-[1190px] h-[2864px] bg-gray-50 rounded-xl mr-[250px] mt-[32px] ">
            <div className="">

                <BodyHeader value={props.value} />

                <div className="flex flex-wrap mt-[80px] mb-[14px]  ">



                </div>
            </div>
        </main>
    );
};

export default PageBody;