import { Fragment } from "react";
import { Col, Ratio } from "react-bootstrap";

import { uri as apiUrl } from "../../apollo/api";

import Image from "next/image";
import Link from "next/link";

import dayjs from "dayjs";

export default function MusicCard({ data }) {
  const formattedDate = dayjs(data.releaseDate).format("YYYY");

  // console.log(data);

  return (
    <Fragment>
      {/* <Col xs={6} md={4} lg={3} xxl={2}> */}
      <Col className="col-auto mb-3">
        <Link href={"/album/" + data.uid}>
          <a className="text-decoration-none d-block">
            <div className="card--album p-3 position-relative">
              <Ratio
                aspectRatio="1x1"
                className="position-relative card--album__ratio"
              >
                <Image
                  src={apiUrl + data.coverUrl}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  placeholder="blur"
                  blurDataURL={data.blurredCover}
                  alt={"Frizzifi Album - " + data.name}
                />
              </Ratio>

              <div className="text-center text-white">
                <h6 className="mt-2 mb-0">{data.name}</h6>
                <p className="m-0">{formattedDate} - Album</p>
              </div>
            </div>
          </a>
        </Link>
      </Col>
    </Fragment>
  );
}
