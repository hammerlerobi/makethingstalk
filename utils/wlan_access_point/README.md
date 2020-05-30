# WLAN Access Point Util

## Steup

When using for the first time flow the the steps below.

1. Open a terminal
2. Go to the folder `cd /utils/wlan_access_point` 
3. enter `chmod +x *` to grant execution rights
4. enter `./01_install_dependencies.sh` to install all dependencies
5. enter `./02_create_access_point_config.sh` to create a WLAN config


## Enable access point

To enable the WLAN access point enter `./enable_access_point.sh`

> note your raspberry pi will not have a connection to the internet anymore.

## Disable access point

To disable the WLAN access point enter `./disable_access_point.sh`

