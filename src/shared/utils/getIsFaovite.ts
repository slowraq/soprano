export const getIsFavorite=(cityName:string) => {
    const favorites = localStorage.getItem('favoriteCities');
    return Boolean(favorites && favorites.includes(cityName));
};
