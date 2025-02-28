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

//import {  ISecurityContext} from "../types";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import {
  containerForHeader,
  createTenantCommon,
  formFieldStyles,
  modalBasic,
  spacingUtils,
  tenantDetailsStyles,
  wizardCommon,
} from "../../Common/FormComponents/common/styleLibrary";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../../../store";
import api from "../../../../common/api";
import { ErrorResponseHandler } from "../../../../common/types";
import { useParams } from "react-router-dom";
import FormSwitchWrapper from "../../Common/FormComponents/FormSwitchWrapper/FormSwitchWrapper";
import Grid from "@mui/material/Grid";
import InputBoxWrapper from "../../Common/FormComponents/InputBoxWrapper/InputBoxWrapper";
import { Button, DialogContentText } from "@mui/material";
import ConfirmDialog from "../../Common/ModalWrapper/ConfirmDialog";
import {
  setErrorSnackMessage,
  setSnackBarMessage,
} from "../../../../systemSlice";
import { IKeyValue } from "../ListTenants/types";
import KeyPairEdit from "./KeyPairEdit";
import InputUnitMenu from "../../Common/FormComponents/InputUnitMenu/InputUnitMenu";
import { ITenantLogsStruct } from "../ListTenants/types";
import { 
    setAuditLoggingEnabled,
    setImage,
    setDBImage,
    setDBInitImage,
    setDiskCapacityGB,
    setServiceAccountName,
    setDBServiceAccountName,
    setCPURequest,
    setMemRequest,
    setDBCPURequest,
    setDBMemRequest,
} from "../TenantDetails/tenantAuditLogSlice";

import { clearValidationError } from "../utils";

interface ITenantAuditLogs {
  classes: any;
}

const styles = (theme: Theme) =>
  createStyles({
    ...tenantDetailsStyles,
    ...spacingUtils,
    bold: { fontWeight: "bold" },
    italic: { fontStyle: "italic" },
    fileItem: {
      marginRight: 10,
      display: "flex",
      "& div label": {
        minWidth: 50,
      },

      "@media (max-width: 900px)": {
        flexFlow: "column",
      },
    },
    ...containerForHeader(theme.spacing(4)),
    ...createTenantCommon,
    ...formFieldStyles,
    ...modalBasic,
    ...wizardCommon,
  });

const TenantAuditLogging = ({ classes }: ITenantAuditLogs) => {
  const dispatch = useAppDispatch();
  const { tenantName, tenantNamespace } = useParams();
  const auditLoggingEnabled = useSelector(
    (state: AppState) => state.editTenantLogging.auditLoggingEnabled
  );
  const image = useSelector(
    (state: AppState) => state.editTenantLogging.image
  );
  const dbImage = useSelector(
    (state: AppState) => state.editTenantLogging.dbImage
  );
  const dbInitImage = useSelector(
    (state: AppState) => state.editTenantLogging.dbInitImage
  );
  const diskCapacityGB = useSelector(
    (state: AppState) => state.editTenantLogging.diskCapacityGB
  );
  const cpuRequest = useSelector(
    (state: AppState) => state.editTenantLogging.cpuRequest
  );
  const memRequest = useSelector(
    (state: AppState) => state.editTenantLogging.memRequest
  );

  const dbCpuRequest = useSelector(
    (state: AppState) => state.editTenantLogging.dbCPURequest
  );
  const dbMemRequest = useSelector(
    (state: AppState) => state.editTenantLogging.dbMemRequest
  );
  const serviceAccountName = useSelector(
    (state: AppState) => state.editTenantLogging.serviceAccountName
  );
  const dbServiceAccountName = useSelector(
    (state: AppState) => state.editTenantLogging.dbServiceAccountName
  );
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [toggleConfirmOpen, setToggleConfirmOpen] = useState<boolean>(false);

  const [labels, setLabels] = useState<IKeyValue[]>([{ key: "", value: "" }]);
  const [annotations, setAnnotations] = useState<IKeyValue[]>([
    { key: "", value: "" },
  ]);
  const [nodeSelector, setNodeSelector] = useState<IKeyValue[]>([
    { key: "", value: "" },
  ]);
  const [dbLabels, setDBLabels] = useState<IKeyValue[]>([{ key: "", value: "" }]);
  const [dbAnnotations, setDBAnnotations] = useState<IKeyValue[]>([
    { key: "", value: "" },
  ]);
  const [dbNodeSelector, setDBNodeSelector] = useState<IKeyValue[]>([
    { key: "", value: "" },
  ]);

  const [refreshLoggingInfo, setRefreshLoggingInfo] =
    useState<boolean>(true);
  const [labelsError, setLabelsError] = useState<any>({});
  const [annotationsError, setAnnotationsError] = useState<any>({});
  const [nodeSelectorError, setNodeSelectorError] = useState<any>({});

  const [dbLabelsError, setDBLabelsError] = useState<any>({});
  const [dbAnnotationsError, setDBAnnotationsError] = useState<any>({});
  const [dbNodeSelectorError, setDBNodeSelectorError] = useState<any>({});

  const cleanValidation = (fieldName: string) => {
    setValidationErrors(clearValidationError(validationErrors, fieldName));
  };

  const setLoggingInfo = (res: ITenantLogsStruct) => {
    dispatch(setAuditLoggingEnabled(!res.disabled))
    dispatch(setImage(res.image));
    dispatch(setServiceAccountName(res.serviceAccountName));
    dispatch(setDBServiceAccountName(res.dbServiceAccountName));
    dispatch(setDBImage(res.dbImage));
    dispatch(setDBInitImage(res.dbInitImage));
    dispatch(setCPURequest(res.logCPURequest));
    dispatch(setDBCPURequest(res.logDBCPURequest));
    if (res.logMemRequest) {
        dispatch(
          setMemRequest(
            Math.floor(
              parseInt(res.logMemRequest, 10) / 1000000000
            ).toString()
          )
        );
      } else {
        dispatch(setMemRequest("0"));
      }
      if (res.logDBMemRequest) {
        dispatch(
          setDBMemRequest(
            Math.floor(
              parseInt(res.logDBMemRequest, 10) / 1000000000
            ).toString()
          )
        );
      } else {
        dispatch(setDBMemRequest("0"));
      }  
    dispatch(setDiskCapacityGB(res.diskCapacityGB));    
    res.labels.length > 0 ? setLabels(res.labels) : setLabels([{ key: "test", value: "test" }]);
    res.annotations.length > 0 ? setAnnotations(res.annotations) : setAnnotations([{ key: "", value: "" }]);
    res.nodeSelector.length > 0 ? setNodeSelector(res.nodeSelector) : setNodeSelector([{ key: "", value: "" }]);
    res.dbLabels.length > 0 ? setDBLabels(res.dbLabels) : setDBLabels([{ key: "", value: "" }]);
    res.dbAnnotations.length > 0 ? setDBAnnotations(res.dbAnnotations) : setDBAnnotations([{ key: "", value: "" }]);
    res.dbNodeSelector.length > 0 ? setDBNodeSelector(res.dbNodeSelector) : setDBNodeSelector([{ key: "", value: "" }]);
  };

  const trim = (x: IKeyValue[]): IKeyValue[] => {
    let retval: IKeyValue[] = [];
    for (let i = 0; i < x.length; i++) {
      if (x[i].key !== "") {
        retval.push(x[i]);
      }
    }
    return retval;
  };

  const checkValid = (): boolean => {
    if (
      Object.keys(validationErrors).length !== 0 ||
      Object.keys(labelsError).length !== 0 ||
      Object.keys(annotationsError).length !== 0 ||
      Object.keys(nodeSelectorError).length !== 0 ||
      Object.keys(dbNodeSelectorError).length !== 0 ||
      Object.keys(dbAnnotationsError).length !== 0 ||
      Object.keys(dbLabelsError).length !== 0 
    ) {
      let err: ErrorResponseHandler = {
        errorMessage: "Invalid entry",
        detailedError: "",
      };
      dispatch(setErrorSnackMessage(err));
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (refreshLoggingInfo) {
      api
      .invoke(
        "GET",
        `/api/v1/namespaces/${tenantNamespace}/tenants/${tenantName}/log`
      )
        .then((res: ITenantLogsStruct) => {
          dispatch(setAuditLoggingEnabled(res.auditLoggingEnabled));
          setLoggingInfo(res);
          setRefreshLoggingInfo(false);
        })
        .catch((err: ErrorResponseHandler) => {
          dispatch(setErrorSnackMessage(err));
          setRefreshLoggingInfo(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshLoggingInfo]);

  const submitLoggingInfo = () => {
    if (checkValid()) {
      api
      .invoke(
        "PUT",
        `/api/v1/namespaces/${tenantNamespace}/tenants/${tenantName}/log`,
        {
          labels: trim(labels),
          annotations: trim(annotations),
          nodeSelector: trim(nodeSelector),
          image: image,
          diskCapacityGB: diskCapacityGB.toString(),
          serviceAccountName: serviceAccountName,
          dbLabels: trim(dbLabels),
          dbAnnotations: trim(dbAnnotations),
          dbNodeSelector: trim(dbNodeSelector),
          dbImage: dbImage,
          dbInitImage: dbInitImage,
          dbServiceAccountName: dbServiceAccountName,
          logCPURequest: cpuRequest,
          logMemRequest: memRequest + "Gi",
          logDBCPURequest: dbCpuRequest,
          logDBMemRequest: dbMemRequest + "Gi",
        }
      )
        .then(() => {
          setRefreshLoggingInfo(true);
          dispatch(setSnackBarMessage(`Audit Log configuration updated.`));
        })
        .catch((err: ErrorResponseHandler) => {
          setErrorSnackMessage(err);
        });
    }
  };

  const toggleLogging = () => {
    if(!auditLoggingEnabled) {
        api
        .invoke(
          "POST",
          `/api/v1/namespaces/${tenantNamespace}/tenants/${tenantName}/enable-logging`
        )
        .then(() => {
          setRefreshLoggingInfo(true);
          setToggleConfirmOpen(false);
        })
        .catch((err: ErrorResponseHandler) => {
          dispatch(
            setErrorSnackMessage({
              errorMessage: "Error enabling logging",
              detailedError: err.detailedError,
            })
          );
        });
  } else {
    api
    .invoke(
      "POST",
      `/api/v1/namespaces/${tenantNamespace}/tenants/${tenantName}/disable-logging`
    )
    .then(() => {
        setRefreshLoggingInfo(true);
        setToggleConfirmOpen(false);
    })
    .catch((err: ErrorResponseHandler) => {
      dispatch(
        setErrorSnackMessage({
          errorMessage: "Error disabling logging",
          detailedError: err.detailedError,
        })
      );
    });
  };
  };
  return (
    <Fragment>
      {toggleConfirmOpen && (
        <ConfirmDialog
          isOpen={toggleConfirmOpen}
          title={
            !auditLoggingEnabled
              ? "Enable Audit Logging for this tenant?"
              : "Disable Audit Logging for this tenant?"
          }
          confirmText={!auditLoggingEnabled ? "Enable" : "Disable"}
          cancelText="Cancel"
          onClose={() => setToggleConfirmOpen(false)}
          onConfirm={toggleLogging}
          confirmationContent={
            <DialogContentText>
              {!auditLoggingEnabled
                ? "A small Postgres server will be started per the configuration provided, which will collect the audit logs for your tenant."
                : " Current configuration will be lost, and defaults reset if reenabled."}
            </DialogContentText>
          }
        />
      )}
      <Grid container spacing={1}>
        <Grid item xs>
          <h1 className={classes.sectionTitle}>Audit Logs</h1>
        </Grid>
        <Grid item xs={7} justifyContent={"end"} textAlign={"right"}>
          <FormSwitchWrapper
            label={""}
            indicatorLabels={["Enabled", "Disabled"]}
            checked={auditLoggingEnabled}
            value={"tenant_logging"}
            id="tenant_logging"
            name="tenant_logging"
            onChange={() => {
              setToggleConfirmOpen(true);
            }}
            description=""
          />
        </Grid>
        <Grid xs={12}>
          <hr className={classes.hrClass} />
        </Grid>
      </Grid>

      {auditLoggingEnabled && (
        <Fragment>
          <Grid item xs={12} paddingBottom={2}>
            <InputBoxWrapper
              id={`image`}
              label={"Image"}
              placeholder={"minio/operator:v4.4.22"}
              name={`image`}
              value={image}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.validity.valid) {
                  dispatch(setImage(event.target.value));
                }
                cleanValidation(`image`);
              }}
              key={`image`}
              pattern={"^[a-zA-Z0-9-./:]{1,253}$"}
              error={validationErrors[`image`] || ""}
            />
          </Grid>
          <Grid item xs={12} paddingBottom={2}>
              <InputBoxWrapper
                id={`dbImage`}
                label={"DB Postgres Image"}
                placeholder={"library/postgres:13"}
                name={`dbImage`}
                value={dbImage}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.validity.valid) {
                      dispatch(setDBImage(event.target.value));
                    }
                    cleanValidation(`dbImage`);
                  }}
                key={`dbImage`}
                pattern={"^[a-zA-Z0-9-./:]{1,253}$"}
                error={validationErrors[`dbImage`] || ""}
              />
            </Grid>
          <Grid item xs={12} paddingBottom={2}>
            <InputBoxWrapper
              id={`dbInitImage`}
              label={"DB Init Image"}
              placeholder={"library/busybox:1.33.1"}
              name={`dbInitImage`}
              value={dbInitImage}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.validity.valid) {
                  dispatch(setDBInitImage(event.target.value));
                }
                cleanValidation(`dbInitImage`);
              }}
              key={`dbInitImage`}
              pattern={"^[a-zA-Z0-9-./:]{1,253}$"}
              error={validationErrors[`dbInitImage`] || ""}
            />
          </Grid>
          <Grid item xs={12} paddingBottom={2}>
            <InputBoxWrapper
              id={`diskCapacityGB`}
              label={"Disk Capacity"}
              placeholder={"Disk Capacity"}
              name={`diskCapacityGB`}
              value={!isNaN(diskCapacityGB) ? diskCapacityGB.toString() : "0"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.validity.valid) {
                  dispatch(setDiskCapacityGB(parseInt(event.target.value)));
                }
                cleanValidation(`diskCapacityGB`);
              }}
              key={`diskCapacityGB`}
              pattern={"[0-9]*"}
              error={validationErrors[`diskCapacityGB`] || ""}
              overlayObject={
                <InputUnitMenu
                  id={"size-unit"}
                  onUnitChange={() => {}}
                  unitSelected={"Gi"}
                  unitsList={[{ label: "Gi", value: "Gi" }]}
                  disabled={true}
                />
              }
            />
          </Grid>
          <Grid item xs={12} paddingBottom={2}>
            <InputBoxWrapper
              id={`cpuRequest`}
              label={"CPU Request"}
              placeholder={"CPU Request"}
              name={`cpuRequest`}
              value={cpuRequest}
              pattern={"[0-9]*"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.validity.valid) {
                  dispatch(setCPURequest(event.target.value));
                }
                cleanValidation(`cpuRequest`);
              }}
              key={`cpuRequest`}
              error={validationErrors[`cpuRequest`] || ""}
            />
          </Grid>
          <Grid item xs={12} paddingBottom={2}>
            <InputBoxWrapper
              id={`dbCPURequest`}
              label={"DB CPU Request"}
              placeholder={"DB CPU Request"}
              name={`dbCPURequest`}
              value={dbCpuRequest}
              pattern={"[0-9]*"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.validity.valid) {
                  dispatch(setDBCPURequest(event.target.value));
                }
                cleanValidation(`dbCPURequest`);
              }}
              key={`dbCPURequest`}
              error={validationErrors[`dbCPURequest`] || ""}
            />
          </Grid>
          <Grid item xs={12} paddingBottom={2}>
            <InputBoxWrapper
              id={`memRequest`}
              label={"Memory Request"}
              placeholder={"Memory request"}
              name={`memRequest`}
              value={memRequest}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.validity.valid) {
                  dispatch(setMemRequest(event.target.value));
                }
                cleanValidation(`memRequest`);
              }}
              pattern={"[0-9]*"}
              key={`memRequest`}
              error={validationErrors[`memRequest`] || ""}
              overlayObject={
                <InputUnitMenu
                  id={"size-unit"}
                  onUnitChange={() => {}}
                  unitSelected={"Gi"}
                  unitsList={[{ label: "Gi", value: "Gi" }]}
                  disabled={true}
                />
              }
            />
          </Grid>
          <Grid item xs={12} paddingBottom={2}>
            <InputBoxWrapper
              id={`dbMemRequest`}
              label={"DB Memory Request"}
              placeholder={"DB Memory request"}
              name={`dbMemRequest`}
              value={dbMemRequest}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.validity.valid) {
                  dispatch(setDBMemRequest(event.target.value));
                }
                cleanValidation(`dbMemRequest`);
              }}
              pattern={"[0-9]*"}
              key={`dbMemRequest`}
              error={validationErrors[`dbMemRequest`] || ""}
              overlayObject={
                <InputUnitMenu
                  id={"size-unit"}
                  onUnitChange={() => {}}
                  unitSelected={"Gi"}
                  unitsList={[{ label: "Gi", value: "Gi" }]}
                  disabled={true}
                />
              }
            />
          </Grid>
          <Grid item xs={12} paddingBottom={2}>
            <InputBoxWrapper
              id={`serviceAccountName`}
              label={"Service Account"}
              placeholder={"Service Account Name"}
              name={`serviceAccountName`}
              value={serviceAccountName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.validity.valid) {
                  dispatch(setServiceAccountName(event.target.value));
                }
                cleanValidation(`serviceAccountName`);
              }}
              key={`serviceAccountName`}
              pattern={"^[a-zA-Z0-9-.]{1,253}$"}
              error={validationErrors[`serviceAccountName`] || ""}
            />
          </Grid>
          {labels !== null && (
            <Grid item xs={12} className={classes.formFieldRow}>
              <span className={classes.inputLabel}>Labels</span>
              <KeyPairEdit
                newValues={labels}
                setNewValues={setLabels}
                paramName={"Labels"}
                error={labelsError}
                setError={setLabelsError}
              />
            </Grid>
          )}

          {annotations !== null && (
            <Grid item xs={12} className={classes.formFieldRow}>
              <span className={classes.inputLabel}>Annotations</span>
              <KeyPairEdit
                newValues={annotations}
                setNewValues={setAnnotations}
                paramName={"Annotations"}
                error={annotationsError}
                setError={setAnnotationsError}
              />
            </Grid>
          )}
          {nodeSelector !== null && (
            <Grid item xs={12} className={classes.formFieldRow}>
              <span className={classes.inputLabel}>Node Selector</span>
              <KeyPairEdit
                newValues={nodeSelector}
                setNewValues={setNodeSelector}
                paramName={"Node Selector"}
                error={nodeSelectorError}
                setError={setNodeSelectorError}
              />
            </Grid>
          )}
             {dbLabels !== null && (
            <Grid item xs={12} className={classes.formFieldRow}>
              <span className={classes.inputLabel}>DB Labels</span>
              <KeyPairEdit
                newValues={dbLabels}
                setNewValues={setDBLabels}
                paramName={"dbLabels"}
                error={dbLabelsError}
                setError={setDBLabelsError}
              />
            </Grid>
          )}

          {dbAnnotations !== null && (
            <Grid item xs={12} className={classes.formFieldRow}>
              <span className={classes.inputLabel}>DB Annotations</span>
              <KeyPairEdit
                newValues={dbAnnotations}
                setNewValues={setDBAnnotations}
                paramName={"dbAnnotations"}
                error={dbAnnotationsError}
                setError={setDBAnnotationsError}
              />
            </Grid>
          )}
          {dbNodeSelector !== null && (
            <Grid item xs={12} className={classes.formFieldRow}>
              <span className={classes.inputLabel}>DB Node Selector</span>
              <KeyPairEdit
                newValues={dbNodeSelector}
                setNewValues={setDBNodeSelector}
                paramName={"DB Node Selector"}
                error={dbNodeSelectorError}
                setError={setDBNodeSelectorError}
              />
            </Grid>
          )}
          <Grid item xs={12} textAlign={"right"}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!checkValid()}
              onClick={() => submitLoggingInfo()}
            >
              Save
            </Button>
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

export default withStyles(styles)(TenantAuditLogging);
