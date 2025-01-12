
// import { useState } from 'react';

// export const Preferences = () => {
//   const [source, setSource] = useState('');
//   const [category, setCategory] = useState('');

//   const savePreferences = () => {
//     localStorage.setItem('preferences', JSON.stringify({ source, category }));
//     alert('Preferences saved!');
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Set Preferences</h1>
//       <form className="space-y-4">
//         <div>
//           <label>Preferred Source</label>
//           <input
//             type="text"
//             value={source}
//             onChange={(e) => setSource(e.target.value)}
//             className="border p-2 w-full"
//           />
//         </div>
//         <div>
//           <label>Preferred Category</label>
//           <input
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="border p-2 w-full"
//           />
//         </div>
//         <button
//           type="button"
//           onClick={savePreferences}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Save Preferences
//         </button>
//       </form>
//     </div>
//   );
// };

export const Preferences: React.FC = () => {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Set Your Preferences</h1>
        <p className="text-gray-600">
          Choose your favorite authors, categories, and sources to personalize your news feed.
        </p>
      </div>
    );
  };