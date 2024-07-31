const create = async (params, credentials, book) => {
    try {
      let response = await fetch("/api/books/by/" + params.shopId, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        body: book,
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const read = async (params, signal) => {
    try {
      let response = await fetch("/api/books/" + params.bookId, {
        method: "GET",
        signal: signal,
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const update = async (params, credentials, book) => {
    try {
      let response = await fetch(
        "/api/book/" + params.shopId + "/" + params.bookId,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + credentials.t,
          },
          body: book,
        }
      );
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const remove = async (params, credentials) => {
    try {
      let response = await fetch(
        "/api/book/" + params.shopId + "/" + params.bookId,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + credentials.t,
          },
        }
      );
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const listByShop = async (params, signal) => {
    try {
      let response = await fetch("/api/books/by/" + params.shopId, {
        method: "GET",
        signal: signal,
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const listLatest = async (signal) => {
    try {
      let response = await fetch("/api/books/latest", {
        method: "GET",
        signal: signal,
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const listRelated = async (params, signal) => {
    try {
      let response = await fetch("/api/books/related/" + params.bookId, {
        method: "GET",
        signal: signal,
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const listCategories = async (signal) => {
    try {
      let response = await fetch("/api/books/categories", {
        method: "GET",
        signal: signal,
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const list = async (params, signal) => {
    const query = queryString.stringify(params);
    try {
      let response = await fetch("/api/books?" + query, {
        method: "GET",
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  export {
    create,
    read,
    update,
    remove,
    listByShop,
    listLatest,
    listRelated,
    listCategories,
    list,
  };
  