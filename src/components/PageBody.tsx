import VideoItemList from "./VideoItemList.tsx";
import BodyHeader from "./BodyHeader.tsx";


const itemLists = [

    {
     classes:'none',
    title: 'Айдар',
    description1: 'Телехикая',
    description2: 'Мультфильм',
    coverUrl: './public/images/Group 1.png',
    age: '4fgf бөлім'
},
    {
        classes:'hidden:sm block',
        title: 'А--SDD',
        description1: 'Телехикая 8',
        description2: 'Мультфильм***',
        coverUrl: './public/images/Group 1.png',
        age: '5 бөлім'
    },
    {
        classes:' hidden: lg:block',
        title: 'J-==J',
        description1: 'Телех----икая',
        description2: 'Мль-----тфильм',
        coverUrl: './public/images/Group 1.png',
        age: '3 өлім'
    },
    {
        classes:' hidden:xl:block',
        title: '0++',
        description1: 'Телех----икая',
        description2: 'Мль-----тфильм',
        coverUrl: './public/images/Group 1.png',
        age: '3 өлім'
    },
    {
        classes:' hidden:2xl:block',
        title: 'JJ--',
        description1: 'Телех----икая',
        description2: 'Мль-----тфильм',
        coverUrl: './public/images/Group 1.png',
        age: '3 өлім'
    },
    {
        classes:'hidden:3xl:block',
        title: 'JJ+J',
        description1: 'Телех----икая',
        description2: 'Мль-----тфильм',
        coverUrl: './public/images/Group 1.png',
        age: '3 өлім'
    },
    {
        classes:'hidden:4xl:block',
        title: 'JЧЫФЫJ',
        description1: 'Телех----икая',
        description2: 'Мль-----тфильм',
        coverUrl: './public/images/Group 1.png',
        age: '3 өлім'
    }
]

const PageBody = () => {
    return (
        <main className="relative w-[1200px] h-[2864px] bg-gray-50 opsity-1 rounded-xl mr-[250px] mt-[32px] ">
            <div className="">
                <BodyHeader/>

                <div className="flex flex-wrap  mb-[14px]  ">

                {  itemLists.map((videoItemList) => (
                    <VideoItemList
                                   key={videoItemList.title}
                                   {...videoItemList}
                                   classes={videoItemList.classes}/>
                ))}

                </div>
            </div>
        </main>
    );
};

export default PageBody;