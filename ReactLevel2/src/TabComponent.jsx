import { useState } from 'react'
import { Link } from 'react-router-dom'
import InteractiveQuiz from './InteractiveQuiz'

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const tabData = [
    { title: "Tab 1", content: "Content for tab 1 - This is the first tab with some interesting information about our services." },
    { title: "Tab 2", content: "Content for tab 2 - Here you can find details about our products and their specifications." },
    { title: "Tab 3", content: "Content for tab 3 - Contact information and support details are available in this section." },
  ];

  const handleTabClick = (index) => {
    if (index !== activeTab) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveTab(index);
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 200);
    }
  };

  return (
    <>
      <div>
        <div className="tab-headers">
          {tabData.map((tab, index) => (
            <button
              key={index}
              className={`tab-btn ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="tab-content">
          <div className={`content-display ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            <div className="content-wrapper">
              {tabData[activeTab].content}
            </div>
          </div>
        </div>
      </div>
       <hr /><br />
      <InteractiveQuiz/>
      <br /><hr />

<div style={{display:"flex", justifyContent:"center"}}>
          <Link style={{textDecoration:"none"}} to="/" className="toggle-btn">Go to Home Page</Link>
      
</div>
      {/* <h1>advbsvjn</h1> */}
    </>
  );
}

export default Tabs;