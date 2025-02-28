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

import { t, Selector } from "testcafe";
import {
  loginToOperator,
  createTenant,
  createTenantWithoutAuditLog,
  deleteTenant,
  redirectToTenantsList,
  goToPodInTenant,
  goToPodSection,
  goToPvcInTenant,
  goToPvcSection,
} from "./utils";

fixture("For user with default permissions").page("http://localhost:9090");

test("Create Tenant and List Tenants", async (t) => {
  const tenantName = `tenant-${Math.floor(Math.random() * 10000)}`;
  await loginToOperator();
  await createTenant(tenantName);
  await deleteTenant(tenantName);
});

test("Create Tenant Without Audit Log", async (t) => {
  const tenantName = `tenant-${Math.floor(Math.random() * 10000)}`;
  await loginToOperator();
  await createTenantWithoutAuditLog(tenantName);
  await deleteTenant(tenantName);
});

test("Test describe section for PODs in new tenant", async (t) => {
  const tenantName = "storage-lite";
  await loginToOperator();
  await testPODDescribe(tenantName);
});

const testPODDescribe = async (tenantName: string) => {
  await goToPodInTenant(tenantName);
  await goToPodSection(1);
  await checkPodDescribeHasSections();
};

const checkPodDescribeHasSections = async () => {
  await t
    .expect(Selector("#pod-describe-summary").exists)
    .ok()
    .expect(Selector("#pod-describe-annotations").exists)
    .ok()
    .expect(Selector("#pod-describe-labels").exists)
    .ok()
    .expect(Selector("#pod-describe-conditions").exists)
    .ok()
    .expect(Selector("#pod-describe-tolerations").exists)
    .ok()
    .expect(Selector("#pod-describe-volumes").exists)
    .ok()
    .expect(Selector("#pod-describe-containers").exists)
    .ok();
};

test("Test describe section for PVCs in new tenant", async (t) => {
  const tenantName = `storage-lite`;
  await loginToOperator();
  await testPvcDescribe(tenantName);
});

const testPvcDescribe = async (tenantName: string) => {
  await goToPvcInTenant(tenantName);
  await goToPvcSection(1);
  await checkPvcDescribeHasSections();
};

const checkPvcDescribeHasSections = async () => {
  await t
    .expect(Selector("#pvc-describe-summary").exists)
    .ok()
    .expect(Selector("#pvc-describe-annotations").exists)
    .ok()
    .expect(Selector("#pvc-describe-labels").exists)
    .ok();
};
