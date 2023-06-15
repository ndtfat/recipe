import main from './main.jpg';
import soup from './soup.jpg';
import drink from './drink.jpg';
import dessert from './dessert.jpg';
import healthy from './healthy.jpg';

export default [
    {
        param: 'main',
        title: 'Main Dishes',
        desc: 'Hundreds of main dish recipes. Choose from top-rated comfort food, healthy, and vegetarian options. Find your dinner star now!',
        background: main,
        href: '/recipe/main',
    },
    {
        param: 'soup',
        title: 'Soups',
        desc: 'Hundreds of main dish recipes. Choose from top-rated comfort food, healthy, and vegetarian options. Find your dinner star now!',
        background: soup,
        href: '/recipe/soup',
    },
    {
        param: 'healthy',
        title: 'Healthy',
        desc: 'Find trusted recipes for eating healthy: start the day with a wholesome breakfast, cut the carbs or calories, find the perfect main dish for your special diet.',
        background: healthy,
        href: '/recipe/healthy',
    },
    {
        param: 'dessert',
        title: 'Dessert',
        desc: 'From cocktails to punch for kids, find the perfect party drink. Plus videos, photos, and reviews to help you mix drinks right.',
        background: dessert,
        href: '/recipe/dessert',
    },
    {
        param: 'drink',
        title: 'Drinks',
        desc: 'From cocktails to punch for kids, find the perfect party drink. Plus videos, photos, and reviews to help you mix drinks right.',
        background: drink,
        href: '/recipe/drink',
    },

    {
        param: 'other',
        title: 'Other',
        desc: 'Many type of amazing food. Pick one and try it now.',
        background: drink,
        href: '/recipe/other',
    },
];
