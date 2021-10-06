// import { GetServerSideProps } from 'next';
// import cache from './cache';

// //https://pokeapi.co/api/v2/pokemon/vulpix
// interface Iprops {
//   ability: string | null;
// }

// export default function test({ ability }: Iprops) {
//   return <div>{ability}</div>;
// }

// export const getServerSideProps: GetServerSideProps = async () => {
//   const pokemon = 'vulpix'
//   const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
//   const fetcher = async () => {
//     const reposne = await fetch(url);
//     const { abilities } = await reposne.json();

//     let ability: string | null = null;
//     ability = abilities[0].ability.name;

//     return ability;
//   };

// const cachedAbility = cache.fetch(`ability:${pokemon}`, fetcher, 60 * 60);

//   return { props: { ability: await cachedAbility } };
// };
