// This file is part of MinIO Console Server
// Copyright (c) 2022 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { Box } from "@mui/material";

export const LICENSE_PLANS = {
  COMMUNITY: "community",
  STANDARD: "standard",
  ENTERPRISE: "enterprise",
};

type FeatureItem = {
  label?: any;
  isHeader?: boolean;
  style?: any;
  desc?: any;
  featureTitleRow?: boolean;
};

const FeatureLink = ({ text, anchor }: { text: string; anchor: string }) => {
  return (
    <a
      href={`https://min.io/product/subnet?ref=con#{anchor}`}
      className={"link-text"}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#2781B0",
      }}
    >
      {text}
    </a>
  );
};

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    label: "License ",
    isHeader: true,
  },
  {
    label: "",
    isHeader: false,
    style: {
      height: "360px",
      verticalAlign: "top",
      alignItems: "start",
    },
  },
  {
    desc: "Features",
    featureTitleRow: true,
  },
  {
    desc: "Unit Price",
  },
  {
    desc: () => {
      return <FeatureLink anchor={"sa-long"} text={"Software Release"} />;
    },
  },
  {
    desc: "SLA",
  },
  {
    desc: "Support",
  },
  {
    desc: "Critical Security and Bug Detection",
  },
  {
    desc: () => {
      return <FeatureLink anchor={"sa-instantaneous"} text={"Panic Button"} />;
    },
  },
  {
    desc: () => {
      return <FeatureLink anchor={"sa-healthy"} text={"Health Diagnostics"} />;
    },
  },
  {
    desc: () => {
      return (
        <FeatureLink anchor={"sa-deep"} text={"Annual Architecture Review"} />
      );
    },
  },
  {
    desc: () => {
      return (
        <FeatureLink anchor={"sa-deep"} text={"Annual Performance Review"} />
      );
    },
  },
  {
    desc: "Indemnification",
  },
  {
    desc: () => {
      return (
        <FeatureLink anchor={"sa-deep"} text={"Security and Policy Review"} />
      );
    },
  },
];

export const COMMUNITY_PLAN_FEATURES = [
  {
    label: "Community",
    isHeader: true,
    style: {
      borderBottom: 0,
    },
  },
  {
    label: () => {
      return (
        <Box
          sx={{
            textAlign: "left",
          }}
        >
          <span>
            Designed for developers who are building open source applications in
            compliance with the GNU AGPL v3 license and are able to support
            themselves. It is fully featured. If you distribute, host or create
            derivative works of the MinIO software over the network, the GNU
            AGPL v3 license requires that you also distribute the complete,
            corresponding source code of the combined work under the same GNU
            AGPL v3 license. This requirement applies whether or not you
            modified MinIO.
          </span>
        </Box>
      );
    },
    isHeader: false,
    style: {
      height: "360px",
      borderBottom: 0,
    },
  },
  {
    id: "com_feat_title",
    featureTitleRow: true,
  },
  {
    id: "com_license_cost",
  },
  {
    id: "com_release",
    label: "Upstream",
  },
  {
    id: "com_sla",
    label: "No SLA",
  },
  {
    id: "com_support",
    label: "Community:",
    detail: "Slack + Github",
  },
  {
    id: "com_security",
    label: "Self",
  },
  {
    id: "com_panic",
    xsLabel: "N/A",
  },
  {
    id: "com_diag",
    xsLabel: "N/A",
  },
  {
    id: "com_arch",
    xsLabel: "N/A",
  },
  {
    id: "com_perf",
    xsLabel: "N/A",
  },
  {
    id: "com_indemnity",
    xsLabel: "N/A",
  },
  {
    id: "com_sec_policy",
    xsLabel: "N/A",
  },
];

export const STANDARD_PLAN_FEATURES = [
  {
    label: "Standard",
    isHeader: true,
    style: {
      borderBottom: 0,
    },
  },
  {
    isHeader: false,
    label: () => {
      return (
        <Box
          sx={{
            marginTop: "-85px",
            textAlign: "left",
          }}
        >
          <span>
            Designed for customers who require a commercial license and can
            mostly self-support but want the peace of mind that comes with the
            MinIO Subscription Network’s suite of operational capabilities and
            direct-to-engineer interaction. The Standard version is fully
            featured but with SLA limitations. <br /> <br /> To learn more about
            the MinIO Subscription Network
          </span>{" "}
          <a
            href="https://min.io/product/subnet?ref=con"
            className={"link-text"}
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </a>
          .
        </Box>
      );
    },
    style: {
      height: "360px",
      borderBottom: 0,
    },
  },
  {
    id: "std_feat_title",
    featureTitleRow: true,
  },
  {
    id: "std_license_cost",
    label: () => (
      <Box
        sx={{
          fontSize: "16px",
          fontWeight: 600,
        }}
      >
        $10 per TiB per month
      </Box>
    ),
    detail: () => (
      <Box
        sx={{
          fontSize: "14px",
          fontWeight: 400,
          marginBottom: "5px",
        }}
      >
        (Minimum of 100TiB)
      </Box>
    ),
  },
  {
    id: "std_release",
    label: "1 Year Long Term Support",
  },
  {
    id: "std_sla",
    label: "<48 Hours",
    detail: "(Local Business Hours)",
  },
  {
    id: "std_support",
    label: "L4 Direct Engineering",
    detail: "support via SUBNET",
  },
  {
    id: "std_security",
    label: "Continuous Scan and Alert",
  },
  {
    id: "std_panic",
    label: "1 Per year",
  },
  {
    id: "std_diag",
    label: "24/7/365",
  },
  {
    id: "std_arch",
    xsLabel: "N/A",
  },
  {
    id: "std_perf",
    xsLabel: "N/A",
  },
  {
    id: "std_indemnity",
    xsLabel: "N/A",
  },
  {
    id: "std_sec_policy",
    xsLabel: "N/A",
  },
];

export const ENTERPRISE_PLAN_FEATURES = [
  {
    label: "Enterprise",
    isHeader: true,
    style: {
      borderBottom: 0,
    },
  },
  {
    isHeader: false,
    label: () => {
      return (
        <Box
          sx={{
            marginTop: "-135px",
            textAlign: "left",
          }}
        >
          <span>
            Designed for mission critical environments where both a license and
            strict SLAs are required. The Enterprise version is fully featured
            but comes with additional capabilities. <br /> <br /> To learn more
            about the MinIO Subscription Network
          </span>{" "}
          <a
            href="https://min.io/product/subnet?ref=con"
            className={"link-text"}
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </a>
          .
        </Box>
      );
    },
    style: {
      height: "360px",
      borderBottom: 0,
    },
  },
  {
    id: "end_feat_title",
    featureTitleRow: true,
  },
  {
    id: "ent_license_cost",
    label: () => (
      <Box
        sx={{
          fontSize: "16px",
          fontWeight: 600,
        }}
      >
        $20 per TiB per month
      </Box>
    ),
    detail: () => (
      <Box
        sx={{
          fontSize: "14px",
          fontWeight: 400,
          marginBottom: "5px",
        }}
      >
        (Minimum of 100TiB)
      </Box>
    ),
  },
  {
    id: "ent_release",
    label: "5 Years Long Term Support",
  },
  {
    id: "ent_sla",
    label: "<1 hour",
  },
  {
    id: "ent_support",
    label: "L4 Direct Engineering support via",
    detail: "SUBNET, Phone, Web Conference",
  },
  {
    id: "ent_security",
    label: "Continuous Scan and Alert",
  },
  {
    id: "ent_panic",
    label: "Unlimited",
  },
  {
    id: "ent_diag",
    label: "24/7/365",
  },
  {
    id: "ent_arch",
    yesIcon: true,
  },
  {
    id: "ent_perf",
    yesIcon: true,
  },
  {
    id: "ent_indemnity",
    yesIcon: true,
  },
  {
    id: "ent_sec_policy",
    yesIcon: true,
  },
];

export const PAID_PLANS = [LICENSE_PLANS.STANDARD, LICENSE_PLANS.ENTERPRISE];

export const getRenderValue = (val: any) => {
  return typeof val === "function" ? val() : val;
};
