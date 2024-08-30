export function categoryMangaed(category) {
  let title = category;
  let iconCat = '';
  let bgColor = '';

  switch (category) {
    case 'currentExpenses':
      title = 'Current expenses';
      iconCat = <CiMoneyCheck1 />;
      bgColor = 'bg-red-300 text-red-800';
      break;
    case 'car':
      title = 'Car';
      iconCat = <FaCar />;
      bgColor = 'bg-blue-300 text-blue-800';
      break;
    case 'restaurant':
      title = 'Restaurant';
      iconCat = <MdRestaurant />;
      bgColor = 'bg-orange-300 text-orange-800';
      break;
    case 'nightout':
      title = 'Nightout';
      iconCat = <GiPartyPopper />;
      bgColor = 'bg-purple-300 text-primary-800';
      break;
    case 'supermarket':
      title = 'Supermarket';
      iconCat = <MdFastfood />;
      bgColor = 'bg-yellow-300 text-yellow-800';
      break;
    case 'salary':
      title = 'Salary';
      iconCat = <GiMoneyStack />;
      bgColor = 'bg-green-300 text-green-800';
      break;
    case 'transfer':
      title = 'Transfer';
      iconCat = <TbArrowsTransferDown />;
      bgColor = 'bg-pink-300 text-pink-800';
      break;
    case 'rent':
      title = 'Rent';
      iconCat = <FaHome />;
      bgColor = 'bg-cyan-300 text-cyan-800';
      break;
    default:
      title = 'Unknown title';
      iconCat = 'bg-purple-300 text-primary-800';
      bgColor = 'bg-white text-black';
      break;
  }
  return { title, iconCat, bgColor };
}
