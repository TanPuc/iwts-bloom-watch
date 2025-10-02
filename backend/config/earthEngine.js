import ee from '@google/earthengine';
import { google } from 'googleapis';

let initialized = false;

export async function initEE() {
    if (initialized) return;

    const privateKey = process.env.GEE_PRIVATE_KEY.replace(/\\n/g, '\n');
    const serviceAccountEmail = process.env.GEE_SERVICE_ACCOUNT_EMAIL;

    const credentials = {
      client_email: serviceAccountEmail,
      private_key: privateKey,
    };

    await new Promise((resolve, reject) => {
        ee.data.authenticateViaPrivateKey(
            credentials,
            () => {
                ee.initialize(
                    null,
                    null,
                    () => {
                        console.log("Earth Engine initialized with service account!");
                        initialized = true;
                        resolve();
                    },
                    (error) => {
                        console.error("EE initialization error:", error);
                        reject(error);
                    }
                );
            },
            (error) => {
                console.error("❌ Auth error:", error);
                reject(error);
            }                
        );
    });
}

export function isInit() {
    return initialized;
}

