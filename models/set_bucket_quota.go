// Code generated by go-swagger; DO NOT EDIT.

// This file is part of MinIO Console Server
// Copyright (c) 2020 MinIO, Inc.
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
//

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"encoding/json"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// SetBucketQuota set bucket quota
//
// swagger:model setBucketQuota
type SetBucketQuota struct {

	// amount
	Amount int64 `json:"amount,omitempty"`

	// enabled
	// Required: true
	Enabled *bool `json:"enabled"`

	// quota type
	// Enum: [fifo hard]
	QuotaType string `json:"quota_type,omitempty"`
}

// Validate validates this set bucket quota
func (m *SetBucketQuota) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateEnabled(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateQuotaType(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *SetBucketQuota) validateEnabled(formats strfmt.Registry) error {

	if err := validate.Required("enabled", "body", m.Enabled); err != nil {
		return err
	}

	return nil
}

var setBucketQuotaTypeQuotaTypePropEnum []interface{}

func init() {
	var res []string
	if err := json.Unmarshal([]byte(`["fifo","hard"]`), &res); err != nil {
		panic(err)
	}
	for _, v := range res {
		setBucketQuotaTypeQuotaTypePropEnum = append(setBucketQuotaTypeQuotaTypePropEnum, v)
	}
}

const (

	// SetBucketQuotaQuotaTypeFifo captures enum value "fifo"
	SetBucketQuotaQuotaTypeFifo string = "fifo"

	// SetBucketQuotaQuotaTypeHard captures enum value "hard"
	SetBucketQuotaQuotaTypeHard string = "hard"
)

// prop value enum
func (m *SetBucketQuota) validateQuotaTypeEnum(path, location string, value string) error {
	if err := validate.EnumCase(path, location, value, setBucketQuotaTypeQuotaTypePropEnum, true); err != nil {
		return err
	}
	return nil
}

func (m *SetBucketQuota) validateQuotaType(formats strfmt.Registry) error {

	if swag.IsZero(m.QuotaType) { // not required
		return nil
	}

	// value enum
	if err := m.validateQuotaTypeEnum("quota_type", "body", m.QuotaType); err != nil {
		return err
	}

	return nil
}

// MarshalBinary interface implementation
func (m *SetBucketQuota) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *SetBucketQuota) UnmarshalBinary(b []byte) error {
	var res SetBucketQuota
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
