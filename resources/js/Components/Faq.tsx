import React, { useState, useEffect } from 'react';
import { Clock, ChevronDown } from 'lucide-react';

const FAQComponent = () => {
  const [activeSection, setActiveSection] = useState('Delivery Information');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  const sections = [
    'Delivery Information',
    'Customs & Import Fees',
    'My order is wrong',
    'How do I track my order?',
    'I want to cancel/change my order'
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'Delivery Information':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-2">DELIVERY INFORMATION</h2>
            <div className="flex items-center text-gray-500 mb-4">
              <Clock className="w-4 h-4 mr-2" />
              <span>Updated 2 months ago</span>
            </div>
            <p className="mb-4">Please choose your location from the dropdown below:</p>
            <select className="w-full p-2 border rounded mb-4">
              <option>Select a country</option>
            </select>
            <p className="mb-4">Delivery timeframes are a live representation at the time of ordering and are subject to change. If you've already placed an order, please check your shipping confirmation email for your specific delivery timeframe and tracking link.</p>
            <h3 className="text-lg font-semibold mb-2">THINGS YOU NEED TO KNOW...</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>You'll receive a confirmation email once your order is placed, followed by a second email containing your tracking information once your order has been shipped from our warehouse</li>
              <li>All delivery timeframes start from the day after you place the order unless specified.</li>
              <li>Gift Card purchases don't count towards qualifying for a free shipping threshold.</li>
              <li>Unfortunately, we're unable to deliver to Military Addresses in EU countries.</li>
              <li>In the unlikely event that you don't receive your order after the stated delivery timeframe, or your order is damaged when it arrives, please contact us.</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2">SHIPPING EXCLUSION LIST</h3>
            <p className="mb-4">We currently do not ship to the following places:</p>
            <p className="mb-4">Afghanistan, Belarus, Burundi, Bonaire, Cambodia, Central African Republic, Cuba, Democratic Republic of Congo, Guadeloupe, Iran, Iraq, Kosovo, Lebanon, Libya, Mali, Martinique, Myanmar, Nicaragua, North Korea, Northern Marianas Islands, Oaxaca Region of Mexico, Pakistan, Réunion, Russia, Somalia, South Georgia and South Sandwich Islands, South Sudan, Sudan, Gauteng Province of South Africa, Syria, St. Barthélemy, St. Martin, St. Pierre and Miquelon, Ukraine, Venezuela, Yemen, Zimbabwe.</p>
          </div>
        );
      case 'Customs & Import Fees':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-2">CUSTOMS & IMPORT FEES</h2>
            <div className="flex items-center text-gray-500 mb-4">
              <Clock className="w-4 h-4 mr-2" />
              <span>Updated 19 days ago</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">WHAT IS CUSTOMS DUTY?</h3>
            <p className="mb-4">When goods are imported into a different country or customs territory, there can be a charge applied called 'Customs Duty' that is charged by the local customs authority where the goods are being imported into.</p>
            <p className="mb-4">If Customs Duty is required by your territory, you'll be responsible for paying it to the authorities. Whether Customs Duty is payable, and by how much, depends on your countries specific regulations.</p>
            <p className="mb-4">If you do have to pay Customs Duty though, the amount payable is usually calculated based on the value of the goods and the type of goods being imported.</p>
            <h3 className="text-lg font-semibold mb-2">DO I NEED TO PAY CUSTOMS DUTY FEES AT GYMSHARK?</h3>
            <p className="mb-4">You don't need to pay customs fees when shopping on our USA, UK, Australia, Canada, Norway, Switzerland, France, Germany, Netherland & EU store.</p>
            <p className="mb-4">For all other stores, you may face customs charges issued by your local customs authority. Please see below for further information.</p>
            <h3 className="text-lg font-semibold mb-2">WHAT IF I DON'T PAY THE CUSTOMS DUTY?</h3>
            <p className="mb-4">If you decide to refuse the customs fee, we must confirm with the courier that your parcel will be returned back to Gymshark before processing a refund for your order and in some instances a shipping and handling fee may be deducted from your refund.</p>
            <p className="mb-4">If you're still unsure on whether you'll be subject to customs fees, we recommend contacting your local customs office for more information before placing your order with us.</p>
            <h3 className="text-lg font-semibold mb-2">WHAT IS A SALES TAX?</h3>
            <p className="mb-4">Sales Tax, also known as VAT or GST, is a tax charged on the supply of goods or services. Gymshark is generally registered for Sales Tax in all of the countries it ships to, so we'll charge you the Sales Tax as part of the checkout process. We collect Sales Tax from you on behalf of the local tax authorities and we then pay this directly to the local tax authority.</p>
          </div>
        );
      case 'My order is wrong':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-2">MY ORDER IS WRONG</h2>
            <div className="flex items-center text-gray-500 mb-4">
              <Clock className="w-4 h-4 mr-2" />
              <span>Updated 4 months ago</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">I'M MISSING SOME ITEMS FROM MY ORDER</h3>
            <p className="mb-4">We're sorry if something's missing from your order, but don't worry, it could be because we've only shipped part of your order, and the rest of your order will arrive a few days later.</p>
            <h3 className="text-lg font-semibold mb-2">CHECK IF YOUR ORDER WILL ARRIVE IN SEPARATE SHIPMENTS</h3>
            <p className="mb-4">You can check if your order will arrive in separate packages via your shipping confirmation email titled "Your order is on the way".</p>
            <p className="mb-4">This can happen due to stock availability, meaning sometimes items have to be sent from different warehouses. If this does happen, you may receive another email titled "Some items in your order are on the way" containing further information, and the remaining item(s) will arrive shortly afterwards.</p>
            <h3 className="text-lg font-semibold mb-2">CHECKED YOUR ORDER IS CORRECT BUT STILL MISSING AN ITEM?</h3>
            <p className="mb-4">We're sorry about that!</p>
            <p className="mb-4">The item(s) missing may have been out of stock. If we're unable to fulfil item(s) in your order, we'll have sent you an email about this - It's worth checking your junk/spam folder too!</p>
            <p className="mb-4">If you've checked the above and your order isn't arriving in separate packages, and we haven't let you know some of your order is out of stock, please let us know so we can look into this for you.</p>
            <p className="mb-4">All claims for orders missing an item(s) must be made within 7 days of the delivery date.</p>
            <h3 className="text-lg font-semibold mb-2">I'VE RECEIVED A DIFFERENT ITEM TO WHAT I ORDERED</h3>
            <p className="mb-4">In the unlikely event you've receive a wrong item or the wrong order, or your order is damaged in any way, please contact us with the following information and we'll get it sorted;</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Your order number</li>
              <li>The name of the item you didn't receive</li>
              <li>A photo and the name of the item you have received (if the wrong item)</li>
            </ul>
            <p className="mb-4">All claims for orders received incorrectly due to receiving the wrong item must be made within 14 days of the delivery date.</p>
          </div>
        );
      case 'How do I track my order?':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-2">HOW DO I TRACK MY ORDER?</h2>
            <div className="flex items-center text-gray-500 mb-4">
              <Clock className="w-4 h-4 mr-2" />
              <span>Updated 5 months ago</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">HOW DO I TRACK MY GYMSHARK ORDER?</h3>
            <p className="mb-4">You'll receive an email once your order has shipped titled "Your Order is on the way", containing your tracking link. Alternatively, you can log into your Gymshark Account and track your order!</p>
            <h3 className="text-lg font-semibold mb-2">ALREADY HAVE A GYMSHARK ACCOUNT?</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Log into your Account</li>
              <li>Check the fulfilment status for your order.</li>
              <li>If the order has been fulfilled, select the order (If status is not yet fulfilled, try again in 24hrs to allow us a little longer to fulfil your order)</li>
              <li>Click on the tracking link to be directed to your tracking</li>
            </ul>
            <p className="mb-4">Alternatively, you can use the link provided in your shipping confirmation email.</p>
            <h3 className="text-lg font-semibold mb-2">WHAT IF MY TRACKING HASN'T UPDATED?</h3>
            <p className="mb-4">No stress! Tracking numbers typically update with couriers every 24-48 hours, however, additional delays may occur while your order is in transit.</p>
            <p className="mb-4">In the first instance, check your tracking to understand if your order has been held up by the courier due to issues such as an incorrect address or Customs Fees.</p>
            <p className="mb-4">If you've realised that you've entered an incorrect or incomplete address, please see HERE.</p>
            <p className="mb-4">If your tracking hasn't updated in a few days, don't panic, your order should still be on the way to you. However, if your tracking hasn't updated in 6+ working days please get in touch with our Customer Support team who will be able to assist you.</p>
            <p className="mb-4">For orders placed to Puerto Rico, Hawaii, US Virgin Islands and Guam, APO and FPO addresses, please allow 14+ days for your tracking to update before contacting our team to investigate your order.</p>
          </div>
        );
      case 'I want to cancel/change my order':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-2">I WANT TO CANCEL/CHANGE MY ORDER</h2>
            <div className="flex items-center text-gray-500 mb-4">
              <Clock className="w-4 h-4 mr-2" />
              <span>Updated 9 months ago</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">CAN I CANCEL OR MAKE A CHANGE TO MY ORDER?</h3>
            <p className="mb-4">Unfortunately, we're unable to make any changes to your order once you've hit 'Place Order' at checkout, this includes:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Changing the item or size</li>
              <li>Delivery/billing address</li>
              <li>Adding/removing items to your order</li>
              <li>Shipping method</li>
            </ul>
            <p className="mb-4">However, there is a 15-minute window where you can cancel your order by locating the order either in your confirmation email, or in your account section, and hitting the 'Cancel Order' button.</p>
            <p className="mb-4">Once this time has passed the order can't be cancelled, however you can start a return/exchange once delivered.</p>
            <button className="bg-black text-white px-4 py-2 rounded mb-4">START A RETURN OR EXCHANGE</button>
            <h3 className="text-lg font-semibold mb-2">I THINK MY ADDRESS IS WRONG ON MY ORDER?</h3>
            <p className="mb-4">Input the incorrect address at checkout... Sadly, we can't change an address with the courier once the order is placed, however it may be possible to update your delivery preferences with the courier by contacting them directly.</p>
            <p className="mb-4">If for any reason your order can't be delivered, the courier will return it to us and you'll receive an automatic refund once the parcel has reached our warehouse. You can keep an eye on your tracking information for any updates.</p>
            <p className="mb-4">If your order hasn't shipped yet, please wait until you receive your tracking email so you can provide the courier with the tracking number and they may be able to amend this for you.</p>
            <p className="mb-4">If your order has shipped, please contact the courier directly ASAP as they may be able to help.</p>
            <p className="mb-4">Important to know... If you input the incorrect address at checkout, and the order goes missing or is delivered to that location, we cannot be held accountable to refund or replace the order to your preferred location.</p>
          </div>
        );
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

    const MobileDropdown = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h3 className="font-bold mb-2">ARTICLES IN THIS CATEGORY</h3>
      <div className="relative">
        <button
          className="w-full text-left py-2 px-3 border rounded flex justify-between items-center"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {activeSection}
          <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 w-full bg-white border rounded mt-1">
            {sections.map((section) => (
              <button
                key={section}
                className={`w-full text-left py-2 px-3 ${
                  activeSection === section ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  setActiveSection(section);
                  setIsDropdownOpen(false);
                }}
              >
                {section}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const DesktopSidebar = () => (
    <div className="w-64 bg-white p-4 rounded-lg shadow-sm mr-4">
      <h3 className="font-bold mb-4">ARTICLES IN THIS CATEGORY</h3>
      {sections.map((section) => (
        <button
          key={section}
          className={`w-full text-left py-2 px-3 mb-1 rounded ${
            activeSection === section ? 'bg-black text-white' : 'hover:bg-gray-100'
          }`}
          onClick={() => setActiveSection(section)}
        >
          {section}
        </button>
      ))}
    </div>
  );

  return (
    <div className={`mx-auto bg-gray-100 ${isMobile ? 'p-4' : 'flex max-w-5xl mt-8'}`}>
      {isMobile ? <MobileDropdown /> : <DesktopSidebar />}
      <div className={isMobile ? 'w-full' : 'flex-1'}>
        {renderContent()}
      </div>
    </div>
  );
};

export default FAQComponent;
