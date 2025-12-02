// types.d.ts

// This declares that any import ending in .wav is a module 
// and its default export is a string (the URL path to the file).
declare module "*.wav" {
  const content: string;
  export default content;
}

// You might also need declarations for other common assets:
declare module "*.mp3" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}