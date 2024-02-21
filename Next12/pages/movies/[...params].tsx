import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Seo from "../../components/Seo";

export default function Detail({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const router = useRouter();
  const [title, id] = params || [];
  return (
    <div>
      {title && <Seo title={title} />}
      <h4>{title}</h4>
    </div>
  );
}

interface IParams extends ParsedUrlQuery {
  params: [title: string, id: string];
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext<IParams>) {
  return {
    props: { params: params?.params },
  };
}
