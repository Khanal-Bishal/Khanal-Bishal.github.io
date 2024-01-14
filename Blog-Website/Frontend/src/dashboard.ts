import HTTP from "./urlConfig";
import IBlog from "./interface/IBlog";
import queryString from "query-string";
import { convertIsoToFormattedData } from "./utils";
import { checkIsAdmin } from "./utils";
import axios from "axios";

// variables and constants
const blogsContainer = document.querySelector(".blogs-container") as HTMLDivElement;
const paginationContainer = document.querySelector(".pagination-container") as HTMLElement;
const unparsedUserInfo = localStorage.getItem('userInfo') as any
const userInfo = JSON.parse(unparsedUserInfo)

//event listner
window.addEventListener("load", async (event) => {
  event?.preventDefault();
  if (!userInfo?.accessToken) window.location.href = '../404'
  try {
    const result = await HTTP.get('/user/me')
    const user = result.data.data
    console.log(user.role);
    if (!checkIsAdmin(user.role)) {
      window.location.href = '../404.html'
      return
    }
  } catch (error) {
    console.log("error is here", error);
  }

  const blogId = queryString.parse(location.search);
  const result = await HTTP.get(`/blog?page=${blogId.blog_id}`);
  console.log(result);

  const totalPage = result.data.totalPage;
  const blogs = result.data.data as IBlog[];
  console.log(blogs);

  blogs.forEach((res) => {
    blogsContainer.innerHTML += `
            <div class="mt-3 flex justify-between uppercase font-bold m-auto sm:w-[90%] lg:w-[70%] ">
                <span class="bg-gray-300 text-white p-5 w-[25%] text-center rounded-sm">${res.blog_id
      }</span>
                <span
                    class="bg-gray-300 text-white p-5 w-[25%] text-center rounded-sm text-sm capitalize font-semibold">
                    ${res.title}
                </span>
                <span class="bg-gray-300 text-white p-5 w-[25%] text-center rounded-sm">${convertIsoToFormattedData(
        res.createdAt
      )} </span>
                <div class="bg-gray-300 text-white p-5 w-[25%] text-center rounded-sm flex justify-center gap-3 sm:gap-10">
                    <i class="update-${res.blog_id
      } update-btn fa-solid fa-pen-nib text-2xl text-black hover:text-green-300"></i>
                    <i class=" delete-${res.blog_id
      } delete-btn fa-solid fa-trash text-black text-2xl hover:text-red-300"></i>
                </div>
            </div>
             `;
  });

  for (let index = 1; index <= totalPage; index++) {
    paginationContainer.innerHTML += `
        <a href='./dashboard?blog_id=${index}'>
        <div class="border cursor p-3 px-5 font-bold text-xl bg-black text-white hover:bg-white hover:text-black ">${index}
        </div>
        </a>
        `;
  }
});

blogsContainer.addEventListener("click", async (event) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains("update-btn")) {
    const startIndex = target.classList[0].indexOf("-") + 1;
    const blogId = target.classList[0].slice(startIndex);
    window.location.href = `../update?blog_id=${blogId}`;
  }
  else if (target.classList.contains("delete-btn")) {
    const startIndex = target.classList[0].indexOf("-") + 1;
    const blogId = target.classList[0].slice(startIndex);
    await HTTP.delete(`/blog/${blogId}`);

    window.location.reload();
  }
});
