import img from '../../../assets/home/chef-service.jpg'

const ChefService = () => {
    return (
<div
  className="hero h-[560px] my-12 font-thin"
  style={{
    backgroundImage: `url(${img})`,
     // Use template literals for dynamic image paths
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center h-96 w-2/3 bg-slate-100 rounded-md text-slate-700">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold ">Special Chef</h1>
      <p className="mb-5 text-sm">
      A special chef service offers a personalized dining experience where a professional chef prepares gourmet meals tailored to your preferences, either in the comfort of your home or at an event. This service provides a unique blend of culinary expertise and creativity.
      </p>
    
    </div>
  </div>
</div>
    );
};//alt+ z to wrap
export default ChefService;