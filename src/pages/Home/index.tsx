
import VillageCropChart from '@/components/Chart/VillageCropChart';
import Meta from '@/components/Meta';
import soilImg from '../../assets/home/SOILImg.jpg';
import villageBackground from '../../assets/home/cow.png';
import farmSeeding from '../../assets/home/farm-seedling.png';
import { FarmEnrolledCard, FarmerRegisteredCard, FertilizerPestisedsCard, HomeHeroSectionCard, ShareGrainProductionCard, SoilTestReportCard } from '@/components/Card';

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
      <div className="flex flex-col bg-gray-50">
        <HomeHeroSectionCard imageUrl={farmSeeding}/>
        <FarmEnrolledCard />
        <FarmerRegisteredCard title='Farmer Registered' description='2350 Registered' />
        <SoilTestReportCard title='Soil Test Report Available' description='235 Farm' imageUrl={soilImg}/>
        <VillageCropChart />
        <FarmerRegisteredCard
          title="Total Fertilizers & Pesticides Used"
          description="3,400 Liters/Tons"
        />
        <FertilizerPestisedsCard title="Top Fertilizers & Pesticides Used" data={fertilizers} />
        <FertilizerPestisedsCard title="Top Pesticides Used" data={Pesticides} />
        <ShareGrainProductionCard
          title="Stored Grains Production"
          totalQuantity="8,500 Tons"
          data={grainData}
          onButtonClick={() => alert('More Details Clicked')}
        />

        {/* footer image */}
        <div className="relative">
          <img src={villageBackground} alt="village" className="w-full h-auto" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/0 to-[rgba(54,195,96,0.2)]"></div>
        </div>
      </div>
    </>
  );
};
export default Page1;
