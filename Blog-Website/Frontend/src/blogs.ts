import HTTP from "./urlConfig";
import IBlog from "./interface/IBlog";
import queryString from "query-string";

// variables and constants
const blogsContainer = document.querySelector(
  ".blogs-container"
) as HTMLDivElement;
const paginationContainer = document.querySelector(
  ".pagination-container"
) as HTMLElement;

//event listner
window.addEventListener("load", async (event) => {
  event?.preventDefault();
  const blogId = queryString.parse(location.search);
  const result = await HTTP.get(`/blog?page=${blogId.blog_id}`);
  const totalPage = result.data.totalPage;
  const blogs = result.data.data as IBlog[];

  blogs.forEach((res) => {
    blogsContainer.innerHTML += `
         <div class=" relative cursor mb-8 mt-10  mx-1 border  shadow-xl m-auto sm:custom-container">
                <figure class="relative rounded-lg">
                    <img src=${encodeURI(res.image)}
                        class="w-[100%] opacity-50 h-[200px] aspect-square object-cover sm:h-[400px] ">
                    <div class="absolute inset-0 bg-black opacity-50  rounded-lg hover:opacity-10"></div>
                </figure>

                <div class="text-left mt-5 p-5">
                    <h2 class="font-bold text-4xl capitalize  text-gray-800"> ${
                      res.title
                    } </h2>
                    <p class=" mt-5 text-xl text-gray-400 line-clamp-5"> ${
                      res.description
                    } </p>
                    <a href='/singleblog?blog_id=${res.blog_id}'>
                        <button
                            class="border uppercase bg-red-300 text-white  rounded-sm p-4 mt-7 text-xl font-semibold w-[150px] hover:bg-black hover:border-none hover:text-white transition-all ">
                            Read more
                        </button> </a>
                </div>
            </div>
             `;
  });

  for (let index = 1; index <= totalPage; index++) {
    paginationContainer.innerHTML += `
        <a href='./blogs?blog_id=${index}'>
        <div class="border cursor p-3 px-5 font-bold text-xl bg-black text-white hover:bg-white hover:text-black ">${index}
        </div>
        </a>
        `;
  }
});
