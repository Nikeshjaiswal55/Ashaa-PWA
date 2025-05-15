import { Filter } from 'lucide-react';

import DashboardCard from '@/components/Card/DashboardCard';
import SharedGrainProduction from '@/components/Card/SharedGrainProduction';
import TopFertilizerPesticideCard from '@/components/Card/TopFertilizerPesticideCard';
import VillageCropChart from '@/components/Chart/VillageCropChart';
import Meta from '@/components/Meta';
import { Button } from '@/components/ui/button';

import soilImg from '../../assets/home/SOILImg.jpg';
import villageBackground from '../../assets/home/cow.png';
import farmInrolled from '../../assets/home/farm-enrolled.jpg';
import farmSeeding from '../../assets/home/farm-seedling.png';

const Page1: React.FC = () => {
  const fertilizers = [
    { name: 'Chlorpyrifos', value: '400 Liters' },
    { name: 'Malathion', value: '300 Liters' },
    { name: 'Cypermethrin', value: '250 Liters' },
  ];

  const Pesticides = [
    { name: 'Urea', value: '1,200 Tons' },
    { name: 'DAP', value: '900 Tons' },
    { name: 'NPK', value: '600 Tons' },
  ];

  const grainData = [
    { name: 'Rampal', contact: '+91 9875266044', quantity: '3,200 Tons', crop: 'Rice' },
    { name: 'Narayan', contact: '+91 9875266044', quantity: '2,500 Tons', crop: 'Wheat' },
    { name: 'Ghanshyam', contact: '+91 9875266044', quantity: '1,800 Tons', crop: 'Maize' },
  ];

  return (
    <>
      <Meta title="Home" />
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Top banner */}
        <div className="relative w-full h-30  overflow-hidden flex items-center bg-white">
          <div className="absolute top-0 right-0 h-full w-3/5">
            <img src={farmSeeding} alt="Smart Farming" className="h-40 w-full object-cover" />

            <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-l  from-transparent via-white/60 to-white"></div>
          </div>
          <div className="absolute bottom-0 left-0 h-1/7 w-full bg-gradient-to-t from-white/80 to-transparent"></div>

          <div className="relative z-10 px-6 w-70">
            <h1 className=" text-dangerred  ">Smart</h1>
            <p className="font-normal text-xl">Farming Solutions</p>
          </div>
        </div>
        {/* Top banner */}
        {/* form inrolled section */}
        <div
          className="relative bg-green-200 rounded-xl mx-4  mt-2 overflow-hidden"
          style={{ height: '145px' }}
        >
          <div
            className="absolute -inset-5 bg-cover bg-center"
            style={{ backgroundImage: `url(${farmInrolled})`, opacity: 0.9 }}
          ></div>
          <div className="absolute inset-0 bg-green-900/50"></div>
          <div className="relative z-10 text-white  p-4 h-full">
            <h2 className="text-lg font-semibold absolute top-8 left-10">Farm Enrolled</h2>
            <p className="text-sm mt-1 flex items-center absolute top-16 left-13">
              <span className="relative flex items-center justify-center w-3 h-3 mr-2">
                <span className="absolute h-full w-full rounded-full bg-white opacity-75 animate-ping"></span>
                <span className="  h-2  w-2 bg-white  rounded-full z-10"></span>
              </span>{' '}
              1,250 Enrolled
            </p>
            <Button
              className="absolute top-0 right-0 text-sm h-7   text-white"
              style={{
                backgroundColor: '#005B24',
                borderTopRightRadius: '0px',
                borderTopLeftRadius: '0px',
              }}
            >
              <p className="font-normal text-xs">More Details</p>
            </Button>
            <div className="absolute -bottom-2 -right-2 w-19 h-19 bg-white rounded-full flex items-center justify-center shadow-md">
              <div
                className="bg-green-900 p-3 rounded-full"
                style={{
                  width: '53px',
                  height: '53px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Filter className="text-white w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
        {/* form inrolled section */}
        <DashboardCard
          title="Farmer Registered"
          description="2,350 Registered"
          buttonText="More Details"
          onButtonClick={() => alert('Clicked More Details')}
        />
        <DashboardCard
          title="Soil Test Report Available"
          description="235 Farm"
          imageUrl={soilImg}
          showImage={true}
        />
        <VillageCropChart />
        <DashboardCard
          title="Total Fertilizers & Pesticides Used"
          description="3,400 Liters/Tons"
          buttonText="More Details"
        />
        <TopFertilizerPesticideCard title="Top Fertilizers & Pesticides Used" data={fertilizers} />
        <TopFertilizerPesticideCard title="Top Pesticides Used" data={Pesticides} />
        <SharedGrainProduction
          title="Stored Grains Production"
          totalQuantity="8,500 Tons"
          data={grainData}
          buttonText="More Details"
          onButtonClick={() => alert('More Details Clicked')}
        />
        <div className="relative">
          <img src={villageBackground} alt="village" className="w-full h-auto" />

          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/0 to-[rgba(54,195,96,0.2)]"></div>
        </div>{' '}
      </div>
    </>
  );
};
export default Page1;
