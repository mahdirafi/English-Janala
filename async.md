ব্যাখ্যা (বাংলায়)
async

const url = `https://openapi.programming-hero.com/api/word/${id}` ;
    const res = await fetch(url);
    const details = await res.json();
    console.log(details);

async হলো একটি কীওয়ার্ড যা ফাংশনকে asynchronous করে।

মানে হলো ফাংশনের ভেতরে এমন কাজ থাকতে পারে যেগুলো সময় নেয় (যেমন API থেকে ডেটা আনা)।

async দিলে ফাংশন সবসময় একটি Promise রিটার্ন করে।

await

await ব্যবহার করা হয় asynchronous কাজ শেষ হওয়া পর্যন্ত অপেক্ষা করার জন্য।

যেমন fetch(url) একটি Promise রিটার্ন করে।

await fetch(url) মানে হলো: fetch শেষ না হওয়া পর্যন্ত পরের লাইন এক্সিকিউট হবে না।

একইভাবে await res.json() মানে হলো JSON ডেটা কনভার্ট হওয়া পর্যন্ত অপেক্ষা করবে।

তোমার কোডে সমস্যা