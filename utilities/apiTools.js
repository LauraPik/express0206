class APIFeatures{
    constructor(query, queryString){

        this.query = query;
        // tikriname ar yra page
        this.queryString = queryString;
    }
    filter(){
          // issisaugo
      const queryObj = {...this.queryString};
      // filtravimas per aprasytus laukus
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el)=>{delete queryObj[el]});
      // pasifiltruojame pagal >= arba <=
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`)
      // filtravimas vyksta per req.query ir joje nereikia await
      this.query = this.query.find(JSON.parse(queryStr));

    //   grazina nufiltruotus duomenis
      return this;

    }
    sort(){
          // sortinimas
      if(this.queryString.sort){
        const sortBy = this.queryString.sort.split(',').join(' ');
        console.log(sortBy)
       
        this.filterquery = this.query.sort(sortBy)
      }else{
        this.query = this.query.sort('createdAt');
      }
      return this;


    }
    limitFields(){
        // Field limiting, parametras fields
      if(this.queryString.fields){
        // url negalima deti tarpu del to splitina per kableli
        const fields = this.queryString.fields.split(',').join(' ');

        this.query = this.query.select(fields);
      }else{
        // mango db veiukia atvirksciai del to minusas
        this.query = this.query.select('-__v');

      }
      return this;

    }

    paginate(){
         
      // pagination
      // pirma reiksme vienetas
      const page = this.queryString.page*1 || 1;
      const limit = this.queryString.limit*1||100;
      // praleisti pries tai puslapio irasus
      const skip = (page-1)*limit

      this.query = this.query.skip(skip).limit(limit);

      // jei nera dok sugeneruojame klaida
    //   if(this.queryString.page){
    //     const numberHotels = this.query.countDocuments();
    //     if(skip>=numberHotels) throw new Error('This page dosn exist')
    //   }
    return this;





      // statinis principas
      // .where('duration')
      // .equals(5)

    }
}

module.exports= APIFeatures;