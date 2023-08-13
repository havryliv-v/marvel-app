
export const useLocaleStore = () => {
   const getLocalInfo = localStorage.getItem('comics') ? parseInt(localStorage.getItem('comics')) : 8
   const pushToLocal = (currentLimit) => {

      if (currentLimit === 8 || currentLimit <= (getLocalInfo)) {

         return
      } else {
         localStorage.setItem('comics', currentLimit)
      }
   }

   return { getLocalInfo, pushToLocal }

}

